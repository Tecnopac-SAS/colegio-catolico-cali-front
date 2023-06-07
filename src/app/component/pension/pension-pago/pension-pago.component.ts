import { Component, OnInit } from '@angular/core';
import { PensionPagoService } from 'src/app/services/pension-pago.service';
import { Avalpay } from 'src/utils/avalpay';
import { TuitionService } from 'src/app/services/tuition.service';
import { CurrencyUtils } from 'src/utils/currencyUtils';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { event } from 'jquery';

@Component({
  selector: 'app-pension-pago',
  templateUrl: './pension-pago.component.html',
  styleUrls: ['./pension-pago.component.css']
})
export class PensionPagoComponent implements OnInit {
  navTitle="Pago de pension"
  public pensionTotal=0
  private descuento=3
  public pensionesList:any
  public pensionesListSelect:any
  public allPensionsPaid: boolean | undefined;
  public mesesArr = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  public matriculaPagada:any
  pensionesListSelectNames: any;
  descMeses: string;
  lsPensionesListSelect: any;

  //Avalpay
  paymentData: object;
  moduleName: string;
  pmtId: any;
  navigateTo: string;
  public disabledPaymentButton: boolean = true;

  constructor(
    private pensionService:PensionPagoService,
    private matriculaService:TuitionService,
    private currencyUtils: CurrencyUtils,
    private route: ActivatedRoute,
    //Avalpay
    public Avalpay: Avalpay,
    private router:Router) { 
    this.pensionesList = false;  
    this.pensionesListSelect=[];
    this.pensionesListSelectNames=[];
    this.pmtId = '';
    this.descMeses = '';
    this.lsPensionesListSelect = {};
    //Avalpay
    this.paymentData = {};
    this.moduleName = 'pensiones';
    this.navigateTo = 'pago-pension';
  }
  
  
  ngOnInit(): void {
    this.getMatriculaPagada()
    this.getListPensiones()
    this.pensionesPagadas()

    //Valida estado de matricula
    this.route.queryParams.subscribe(params => {
      if(params['pmtId']){
        this.pmtId = params['pmtId'];
        this.Avalpay.validateTransactions(this.pmtId, () => {
          // Pago de pension
          let lsPension:string = localStorage.getItem(`${this.moduleName}-transaction-status`) || '';
          let paymentAvalPay = JSON.parse(lsPension).data.pensiones;
          this.pensionService.pagoPension({pensiones: paymentAvalPay},'AvalPay').subscribe(response=>{},error=>{});
        },() => {
          this.getListPensiones()
        }, this.navigateTo, this.moduleName);
        
      }
    });
  }

  paymentAvalPayComponent(){
    this.Avalpay.paymentAvalPay(this.moduleName,this.paymentData, this.pensionTotal, 1, this.navigateTo, this.descMeses)
  }

  formatCurrency(amount: number): string {
    return this.currencyUtils.formatCurrency(amount);
  }


  getListPensiones(){
    let data = {idAcudiente:localStorage.getItem('idAcudiente')}
    this.pensionService.listPension(data).subscribe(res=>{
      this.pensionesList = res.result
      if(this.pensionesList.every((item: any) => item.estatus === 'Pagado')){
        this.allPensionsPaid = true
      }
    })
  }

  async pensionesPagadas(){
    await console.log(this.pensionesList);
  }

  getMatriculaPagada(){
    let data = {idAcudiente:localStorage.getItem('idAcudiente')}
    this.matriculaService.getPagoMatricula(data).subscribe(res=>{
      this.matriculaPagada=res.resp
    })
  }

  parseMes(fecha:any){
    const subFecha = Number(fecha.substring(5,7))
    return this.mesesArr[subFecha-1]
  }
  checkPendientes(fecha:any,$event:any){
    this.pensionTotal=0
    this.pensionesListSelect=[]
    let text=''
    const isChecked = ($event.target as HTMLInputElement).checked;
    //Validacion lista de meses para armar la descripcion del mensaje del pago
    if (isChecked) {
      if (!this.pensionesListSelectNames.includes(this.parseMes(fecha))) {
        this.pensionesListSelectNames.push(this.parseMes(fecha));
        //Descripcion para enviar a avalpay
        this.descMeses = `PENSIÓN MES: ${JSON.parse(JSON.stringify(this.pensionesListSelectNames)).join(', ')} `;
      }
    } else {
        this.pensionesListSelectNames.pop(this.parseMes(fecha));
        //Descripcion para enviar a avalpay
        this.descMeses = `PENSIÓN MES: ${JSON.parse(JSON.stringify(this.pensionesListSelectNames)).join(', ')} `;
    }

    Object.keys(this.pensionesList).forEach(key => {
      let checkBox= document.getElementById('check'+this.pensionesList[key].id) as HTMLInputElement
      if((new Date(fecha) > new Date(this.pensionesList[key].fechaPago))){
        if (!checkBox.checked) {
          if (text=='') {
            text='Favor de seleccionar '+this.parseMes(this.pensionesList[key].fechaPago)
            this.pensionesListSelectNames = [];
          }else{
            text+=', '+this.parseMes(this.pensionesList[key].fechaPago)
          }
        }else{
          if (this.pensionesList[key].estatus!='Pagado') {
            this.pensionTotal+=this.pensionesList[key].valor
            this.pensionesListSelect.push({id:this.pensionesList[key].id,valor:this.pensionesList[key].valor,mora:this.pensionesList[key].mora})
          }
        }
      }else{
        if (checkBox.checked) {
          if (this.pensionesList[key].estatus!='Pagado') {
            this.pensionTotal+=this.pensionesList[key].valor
            this.pensionesListSelect.push({id:this.pensionesList[key].id,valor:this.pensionesList[key].valor,mora:this.pensionesList[key].mora})
          }
        }
      }
    });
    if (this.pensionesListSelect.length>=3) {
      // this.pensionTotal = this.pensionTotal - (Math.floor(this.pensionTotal*this.descuento)/100)
      // let valorNew = this.pensionTotal/this.pensionesListSelect.length
      let sum = 0
      Object.keys(this.pensionesListSelect).forEach(key => {
        let descuento = this.pensionesListSelect[key].valor - (Math.floor(this.pensionesListSelect[key].valor*this.descuento)/100)
        this.pensionesListSelect[key].valor = descuento
        sum += descuento
      });
      this.pensionTotal = sum
    }
    if (text!='') {
      $event.currentTarget.checked=false
      text+=' antes de seleccionar esta pensión'
      Swal.fire(
        text,
        '',
        'info'
      )
    }

    this.paymentData = {
      pensiones: this.pensionesListSelect
    }

  }
  pagarPension(){
    Swal.fire({
      title: '¿Estas seguro que deseas pagar la matricula con la opcion bolsillo?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        if (this.pensionesListSelect.length==0) {
          Swal.fire('Parece que aun no seleccionas alguna pensión', 'Favor de ingresar al menos una pensión', 'info')
        } else {
          if (Number(localStorage.getItem('bolsillo')) >= Number(this.pensionTotal)) {
            this.pensionService.pagoPension(this.paymentData, 'bolsillo').subscribe(response=>{
              Swal.fire(response.mensaje, '', (response.status)?'success':'error').then((result) => {
                if (result.isConfirmed) {
                  this.getListPensiones()
								  this.router.navigate([`${this.navigateTo}`]);
                }
              } )
            },error=>{
  
            });
          }else{
            Swal.fire('Parece que no tienes fondos suficientes', 'Favor de ingresar fondos en el bolsillo', 'info')
          }
        }
      }
    })
  }
}
