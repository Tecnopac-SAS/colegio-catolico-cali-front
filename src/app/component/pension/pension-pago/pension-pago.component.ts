import { Component, OnInit } from '@angular/core';
import { PensionPagoService } from 'src/app/services/pension-pago.service';
import { BolsilloService } from 'src/app/services/bolsillo.service';
import { SoportesPagosService } from 'src/app/services/soportes-pagos.service';
import { Avalpay } from 'src/utils/avalpay';
import { TuitionService } from 'src/app/services/tuition.service';
import { PensionService } from 'src/app/services/pension.service';
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
  public pensionTotalSinDescuento=0
  public allMonthsSelected: boolean = false;
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
  discount: boolean;
  discountPercent: number;
  discountWarning5days: boolean;

  //Soportes de Pago
  paymentCode: any;

  constructor(
    private pensionPagoService:PensionPagoService,
    private PensionService:PensionService,
    private matriculaService:TuitionService,
    private currencyUtils: CurrencyUtils,
    
    //Soportes de Pago
    public bolsilloService:BolsilloService,
    public soportesPagosService:SoportesPagosService,

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
    this.discount = false;
    this.discountPercent = 0;
    this.discountWarning5days = false;
    //Avalpay
    this.paymentData = {};
    this.moduleName = 'pensiones';
    this.navigateTo = 'pago-pension';

    //Soportes de Pago
    this.paymentCode;


  }
  
  
  ngOnInit(): void {
    this.getMatriculaPagada()
    this.getListPensiones()
    this.pensionesPagadas()
    
    //Soportes de Pago
    this.paymentCode = [...Array(8)].map(() => (~~(Math.random() * 36)).toString(36)).join('');

    //Valida estado de matricula
    this.route.queryParams.subscribe(params => {
      if(params['pmtId']){
        this.pmtId = params['pmtId'];
        this.Avalpay.validateTransactions(this.pmtId, () => {
          // Pago de pension
          let lsPension:string = localStorage.getItem(`${this.moduleName}-transaction-status`) || '';
          let paymentAvalPay = JSON.parse(lsPension).data.pensiones;
          this.pensionPagoService.pagoPension({pensiones: paymentAvalPay},'AvalPay').subscribe(response=>{},error=>{});
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
    this.pensionPagoService.listPension(data).subscribe(res=>{
      this.pensionesList = res.result
      if(this.pensionesList.every((item: any) => item.estatus === 'Pagado')){
        this.allPensionsPaid = true
      }
      console.log(this.pensionesList);
      this.getListPension()
    })
  }

  getListPension(){
    this.PensionService.obtenerPension(this.pensionesList[0]?.idPension).subscribe(
      response=>{
        console.log(response.result);
        this.discountPercent = response.result?.pensionAsDiscounts.percentage
        
        console.log(response);
      });
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
    
    const fechaActual = new Date();
    const diaDelMes = fechaActual.getDate();

    let text=''
    const isChecked = ($event.target as HTMLInputElement).checked;

    if (!this.pensionesListSelectNames.includes(this.parseMes(fecha))) {
       this.pensionesListSelectNames.push(this.parseMes(fecha));
    }
    if (isChecked) {

      //Descripcion para enviar a avalpay
      this.descMeses = `PENSIÓN MES: ${JSON.parse(JSON.stringify(this.pensionesListSelectNames)).join(', ')} `;

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
      if (diaDelMes <= 5) {
        this.discount = true;
        let sum = 0
        Object.keys(this.pensionesListSelect).forEach(key => {
          let descuento = this.pensionesListSelect[key].valor - (Math.floor(this.pensionesListSelect[key].valor*this.discountPercent)/100)
          this.pensionesListSelect[key].valor = descuento
          sum += descuento
        });
        this.pensionTotalSinDescuento = this.pensionTotal;
        this.pensionTotal = sum
      }else{
        this.discountWarning5days = true;
        this.pensionTotal = this.pensionTotal; // No hay descuento
      }
    }else{
      this.discount = false;
      this.discountWarning5days = false;
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
      pensiones: this.pensionesListSelect,
      paymentCode: this.paymentCode
    }

  }
  selectAllMonths($event: any) {
    if ($event.target.checked) {
      this.allMonthsSelected = true;
      this.pensionesListSelectNames = this.mesesArr;
      this.pensionesListSelect = this.pensionesList.filter(
        (pension: any) => pension.estatus !== 'Pagado'
      );
  
      // selección automática de Checkbox
      Object.keys(this.pensionesList).forEach((key) => {
        const checkBox = document.getElementById(
          'check' + this.pensionesList[key].id
        ) as HTMLInputElement;
  
        if (this.pensionesList[key].estatus !== 'Pagado') {
          checkBox.checked = true;
          checkBox.disabled = true;
          this.checkPendientes(this.pensionesList[key].fechaPago, { target: checkBox });
        }
      });
    } else {
      this.allMonthsSelected = false;
      this.pensionesListSelectNames = [];
      this.pensionesListSelect = [];
      this.pensionTotal = 0;
  
      // deja de seleccionar el Chexkbox
      Object.keys(this.pensionesList).forEach((key) => {
        const checkBox = document.getElementById(
          'check' + this.pensionesList[key].id
        ) as HTMLInputElement;
  
        checkBox.checked = false;
        checkBox.disabled = false;
      });
    }
  }
  pagarPension(){
    Swal.fire({
      title: '¿Estas seguro que deseas pagar la pensión con la opción bolsillo?',
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
            this.pensionPagoService.pagoPension(this.paymentData, 'bolsillo').subscribe(response=>{

           //Descuento bolsillo
           this.bolsilloService.descuento({idAcudiente: localStorage.getItem('idAcudiente'), cant: this.pensionTotal}).subscribe(response=>{}); 
          
           //Soportes De Pago
           let soportePagoData = {
             paymentCode: this.paymentCode,
             idAcudiente: localStorage.getItem('idAcudiente'),
             tipoPago: 'Pensión',
             viaPago: 'Bolsillo',
             monto: this.pensionTotal
           }
           this.soportesPagosService.crearSoportePago(soportePagoData).subscribe(response=>{}); 

           Swal.fire({
            icon:  response.status ? 'success':'error',
            title: response.mensaje,
            showCancelButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                this.getListPensiones();
                window.location.reload();
              } else if (result.isDenied) {}
            });

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
