import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentDatabaseService } from 'src/app/services/student-database.service';
import { BolsilloService } from 'src/app/services/bolsillo.service';
import { SoportesPagosService } from 'src/app/services/soportes-pagos.service';
import { TuitionService } from 'src/app/services/tuition.service';
import { Avalpay } from 'src/utils/avalpay';
import { CurrencyUtils } from 'src/utils/currencyUtils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pago-matricula',
  templateUrl: './pago-matricula.component.html',
  styleUrls: ['./pago-matricula.component.css']
})
export class PagoMatriculaComponent implements OnInit {
  navTitle="Pago de matrícula"
  public pension: any
  public pensionMensual: any
  public pensionMeses:any
  public idPension:any
  public recargo: any
  private porcentajePenali = 60
  private porcentajeDesc: any
  public matricula:any
  public saldoPendiente :any
  formValue!: FormGroup
  dataPagoAvalPay: any;
  calendarType: any;
  
  //Avalpay
  paymentData: object;
  moduleName: string;
  pmtId: any;
  descPagoAvalPay: string;
  navigateTo: string;
  public disabledPaymentButton: boolean = true;

  jornada: string;
  paymentCode: any;
  
  constructor(
    private formBuilder:FormBuilder,
    private currencyUtils: CurrencyUtils,
    private route: ActivatedRoute,
    private router:Router,
    public Avalpay: Avalpay,
    public bolsilloService:BolsilloService,
    public soportesPagosService:SoportesPagosService,
    private StudentService:StudentDatabaseService, private MatriculaService:TuitionService) { 

      //Avalpay
      this.paymentData = {};
      this.moduleName = 'matricula';
      this.descPagoAvalPay = 'MATRÍCULA';
      this.navigateTo = 'pago-matricula';

      this.jornada = '';
      
      //Soportes de Pago
      this.paymentCode;

      this.pensionMensual=0
      this.pensionMeses=10
      this.paymentData = {};
      this.StudentService.getPension().subscribe(response=>{
        this.pension = JSON.stringify(response.result.price)
        this.porcentajeDesc = JSON.stringify(response.result.discount)
        this.idPension = JSON.stringify(response.result.id)
        this.dataPagoAvalPay = {};
        this.calendarType = '';
      },error=>{});

      this.StudentService.getMatricula().subscribe(response=>{
        this.matricula = JSON.stringify(response.result)
      },error=>{});
    }

  ngOnInit(): void {

    //Soportes de Pago
    this.paymentCode = [...Array(8)].map(() => (~~(Math.random() * 36)).toString(36)).join('');

    //Valida estado de matricula
    this.route.queryParams.subscribe(params => {
      if(params['pmtId']){
        this.pmtId = params['pmtId'];
        this.Avalpay.validateTransactions(this.pmtId, () => {

          let lsMatricula:string = localStorage.getItem(`${this.moduleName}-transaction-status`) || '';
          let paymentAvalPay = JSON.parse(lsMatricula).data;
          this.MatriculaService.pagoMatricula(paymentAvalPay).subscribe(response=>{},error=>{})
          
        },() => {}, this.navigateTo, this.moduleName);
      }
    });

  }
  paymentAvalPayComponent(){
    this.Avalpay.paymentAvalPay(this.moduleName,this.paymentData, this.matricula, 1, this.navigateTo, this.descPagoAvalPay)
  }
  formatCurrency(amount: number): string {
    return this.currencyUtils.formatCurrency(amount);
  }

  configurarMatricula(e:Event){
    
    const selectElement = e.target as HTMLSelectElement;
    const selectedValue = selectElement.value;

    if (selectedValue!=undefined || selectedValue!=0) {
      switch (Number(selectedValue)) {
        case 0:
          this.pensionMensual = 0
          this.disabledPaymentButton = true;
          break;
        case 10:
          this.pensionMeses = selectedValue;
          this.recargo =0
          let newPension = this.pension-Math.floor(this.pension*this.porcentajeDesc)/100
          this.pensionMensual = Number.parseFloat((newPension/this.pensionMeses) + this.recargo).toFixed(2);
          this.descPagoAvalPay = 'MATRÍCULA A 10 MESES';
          this.disabledPaymentButton = false;
          break;
        case 11:
          this.pensionMeses = selectedValue;
          this.recargo =0;
          let numer:any = Number.parseFloat((this.pension/this.pensionMeses) + this.recargo).toFixed(2);
          this.pensionMensual = Math.round(numer);
          this.descPagoAvalPay = 'MATRÍCULA A 11 MESES';
          this.disabledPaymentButton = false;
          break;
        case 12:
          this.pensionMeses = selectedValue;
          this.recargo = 0;
          this.pensionMensual = Number.parseFloat((this.pension/this.pensionMeses) + this.recargo).toFixed(2);
          this.descPagoAvalPay = 'MATRÍCULA A 12 MESES';
          this.disabledPaymentButton = false;
          break;
          
      }

      
      
      if (this.saldoPendiente > 0) {
        Swal.fire({
          icon: 'error',
          title: 'No puedes realizar pagos',
          text: 'Aún tienes un saldo pendiente.',
        });
        
        this.disabledPaymentButton = true;
        
      } else {
        
        this.disabledPaymentButton = false;
      }  
      
      this.paymentData = {
        monto:this.matricula,
        metodoPago:'AvalPay',
        jornada: this.jornada,
        idAcudiente:localStorage.getItem('idAcudiente'),
        valMes:this.pensionMensual,
        meses:this.pensionMeses,
        calendartype: this.calendarType,
        idPension:this.idPension,
        paymentCode: this.paymentCode
      }
      
    }
    
  }
  
  
  pagarBolsillo(){
    Swal.fire({
      title: '¿Estas seguro que deseas pagar la matricula con la opción bolsillo?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        if (Number(localStorage.getItem('bolsillo')) >= Number(this.matricula)) {

          this.MatriculaService.pagoMatricula(this.paymentData).subscribe(response=>{
           //Descuento bolsillo
           this.bolsilloService.descuento({idAcudiente: localStorage.getItem('idAcudiente'), cant: this.matricula}).subscribe(response=>{}); 
          
           //Soportes De Pago
           let soportePagoData = {
             paymentCode: this.paymentCode,
             idAcudiente: localStorage.getItem('idAcudiente'),
             tipoPago: 'Matrícula',
             viaPago: 'Bolsillo',
             monto: this.matricula
           }
           this.soportesPagosService.crearSoportePago(soportePagoData).subscribe(response=>{}); 
            
            Swal.fire({
              icon:  response.status ? 'success':'error',
              title: response.mensaje,
              showCancelButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              } else if (result.isDenied) {}
            });
          },error=>{});
        }else{
          Swal.fire('Parece que no tienes fondos suficientes', 'Favor de ingresar fondos en el bolsillo', 'info')
        }
      }
    })
  }


}
