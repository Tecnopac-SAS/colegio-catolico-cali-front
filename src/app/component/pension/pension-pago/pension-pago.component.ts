import { Component, OnInit } from '@angular/core';
import { PensionPagoService } from 'src/app/services/pension-pago.service';
import { AvalPayService } from 'src/app/services/avalpay.service';
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
  public mesesArr = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  public matriculaPagada:any
  pmtId: string;
  pensionesListSelectNames: any;
  descMeses: string;
  lsPensionesListSelect: any;

  constructor(
    private pensionService:PensionPagoService,
    private matriculaService:TuitionService,
    private currencyUtils: CurrencyUtils,
    private route: ActivatedRoute,
    private router:Router,
    private AvalPayService:AvalPayService) { 
    this.pensionesListSelect=[];
    this.pensionesListSelectNames=[];
    this.pmtId = '';
    this.descMeses = '';
    this.lsPensionesListSelect = {};
  }
  
  
  ngOnInit(): void {
    this.getMatriculaPagada()
    this.validateTransactions()
    this.getListPensiones()
  }

  formatCurrency(amount: number): string {
    return this.currencyUtils.formatCurrency(amount);
  }


  getListPensiones(){
    let data = {idAcudiente:localStorage.getItem('idAcudiente')}
    this.pensionService.listPension(data).subscribe(res=>{
      this.pensionesList=res.result
    })
  }
  getMatriculaPagada(){
    let data = {idAcudiente:localStorage.getItem('idAcudiente')}
    this.matriculaService.getPagoMatricula(data).subscribe(res=>{
      this.matriculaPagada=res.resp
    })
  }

  validateTransactions(){
    //Obtenemos el id de la transaccion
    this.route.queryParams.subscribe(params => {
      if(params['pmtId']){
        this.pmtId = params['pmtId'];
        this.AvalPayService.makePaymentStatus(this.pmtId).subscribe(response =>{

          let trnStatus = response.message.InvoicePmtInfo.PmtStatus.StatusDesc;
          let lstransactionStatus:any = localStorage.getItem('transaction-status');
          this.lsPensionesListSelect = JSON.parse(lstransactionStatus);
          
          if(trnStatus == 'Aprobada' && this.lsPensionesListSelect.trnStatus != true ){
            let datos = {pensiones:this.lsPensionesListSelect.months}
            this.pensionService.pagoPension(datos,'AvalPay').subscribe(response=>{},error=>{});
            Swal.fire(
              'Transaccion Exitosa!',
              `#${this.pmtId} El pago de tu pensión fue ${trnStatus}`,
              'success'
            ).then((result) => {
                let trnNewStatus = this.lsPensionesListSelect.trnStatus = true;
                localStorage.setItem('transaction-status', JSON.stringify(this.lsPensionesListSelect));
                setTimeout(() => {
                  this.router.navigate(['/pago-pension']);
                  this.getListPensiones()
                }, 1000);
            })
          }else{
            this.router.navigate(['/pago-pension']);
          }

        });
      }
    });
  }

  parseMes(fecha:any){
    const subFecha = Number(fecha.substring(5,7))
    return this.mesesArr[subFecha-1]
  }
  checkPendientes(fecha:any,$event:any){
    this.pensionTotal=0
    this.pensionesListSelect=[]
    let text=''
    // Dentro del manejador de evento
    const isChecked = ($event.target as HTMLInputElement).checked;
    //Validacion lista de meses para armar la descripcion del mensaje del pago
    if (isChecked) {
      if (!this.pensionesListSelectNames.includes(this.parseMes(fecha))) {
        this.pensionesListSelectNames.push(this.parseMes(fecha));
        this.descMeses = `PAGO PENSIÓN MES: ${JSON.parse(JSON.stringify(this.pensionesListSelectNames)).join(', ')} `;
      }
    } else {
        this.pensionesListSelectNames.pop(this.parseMes(fecha));
        this.descMeses = `PAGO PENSIÓN MES: ${JSON.parse(JSON.stringify(this.pensionesListSelectNames)).join(', ')} `;
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
            console.log(this.pensionesListSelect);
            let datos = {pensiones:this.pensionesListSelect}
            this.pensionService.pagoPension(datos,'bolsillo').subscribe(response=>{
              // this.matricula = JSON.stringify(response.result)
              Swal.fire(response.mensaje, '', (response.status)?'success':'error').then((result) => {
                if (result.isConfirmed) {
                  location.reload()
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

  pagarPensionAvalPay(amount: any, invoiceType = 1, desc = 'PENSIÓN') {

    let urilocation = '';
    localStorage.removeItem('transaction-status');
    //Creamos la transaccion en el localStorage
    const localStorageTrsnData:any = { months: this.pensionesListSelect, trnStatus: false }
    localStorage.setItem('transaction-status', JSON.stringify(localStorageTrsnData))
    
    //Propagamos la alerta
    Swal.fire({
      title: 'Serás redireccionado a la pagina correspondiente...',
      html: 'Espera un momento...',
      timer: 4000,
      didOpen: () => {
        Swal.showLoading();
        this.AvalPayService.makePayment(amount,invoiceType,desc).subscribe(response =>{
          urilocation = response.message.RefInfo[0].RefType;
        });
      },
      willClose: () => {
        window.location.href = urilocation;
      }
    });
  }
}
