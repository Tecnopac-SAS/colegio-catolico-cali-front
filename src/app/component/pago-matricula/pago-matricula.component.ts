import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentDatabaseService } from 'src/app/services/student-database.service';
import { TuitionService } from 'src/app/services/tuition.service';
import { Avalpay } from 'src/utils/avalpay';
import { CurrencyUtils } from 'src/utils/currencyUtils';
import Swal from 'sweetalert2';
import { defaultFormat } from 'moment';

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
  pmtId: any;
  formValue!: FormGroup
  descPagoAvalPay: any;
  paymentData: any;
  dataPagoAvalPay: any;
  calendarType: any;
  moduleName: string;
  disabledPaymentButton: boolean = true;
  constructor(
    private formBuilder:FormBuilder,
    private currencyUtils: CurrencyUtils,
    private route: ActivatedRoute,
    private router:Router,
    public Avalpay: Avalpay,
    private StudentService:StudentDatabaseService, private MatriculaService:TuitionService) { 
      this.pensionMensual=0
      this.pensionMeses=10
      this.moduleName = 'matricula';
      this.paymentData = {};
      this.StudentService.getPension().subscribe(response=>{
        this.pension = JSON.stringify(response.result.price)
        this.porcentajeDesc = JSON.stringify(response.result.discount)
        this.idPension = JSON.stringify(response.result.id)
        this.descPagoAvalPay = '';
        this.dataPagoAvalPay = {};
        this.calendarType = '';
      },error=>{
  
      });
      this.StudentService.getMatricula().subscribe(response=>{
        this.matricula = JSON.stringify(response.result)
      },error=>{


  
      });
    }

  ngOnInit(): void {

    //Valida estado de matricula
    this.route.queryParams.subscribe(params => {
      if(params['pmtId']){
        this.pmtId = params['pmtId'];
        this.Avalpay.validateTransactions(this.pmtId, () => {
          
          let lsMatricula:string = localStorage.getItem(`${this.moduleName}-transaction-status`) || '';
          let paymentAvalPay = JSON.parse(lsMatricula).data;
          this.MatriculaService.pagoMatricula(paymentAvalPay).subscribe(response=>{},error=>{})
          
        },() => {},'pago-matricula', this.moduleName);
      }
    });

  }
  paymentAvalPayComponent(){
    this.paymentData = {
      monto:this.matricula,
      metodoPago:'AvalPay',
      idAcudiente:localStorage.getItem('idAcudiente'),
      valMes:this.pensionMensual,
      meses:this.pensionMeses,
      calendartype: this.calendarType,
      idPension:this.idPension
    }
    this.Avalpay.paymentAvalPay(this.moduleName,this.paymentData, this.matricula, 1, this.descPagoAvalPay)
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
          this.recargo =0
          let numer:any = Number.parseFloat((this.pension/this.pensionMeses) + this.recargo).toFixed(2);
          this.pensionMensual = Math.round(numer);
          this.descPagoAvalPay = 'MATRÍCULA A 11 MESES';
          this.disabledPaymentButton = false;
          break;
        case 12:
          this.pensionMeses = selectedValue;
          // this.recargo = Math.floor(this.pension*this.porcentajePenali)/100
          this.recargo = 0;
          this.pensionMensual = Number.parseFloat((this.pension/this.pensionMeses) + this.recargo).toFixed(2);
          this.descPagoAvalPay = 'MATRÍCULA A 12 MESES';
          this.disabledPaymentButton = false;
          break;
      }
    }
  }
  pagarBolsillo(){
    Swal.fire({
      title: '¿Estas seguro que deseas pagar la matricula con la opcion bolsillo?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        if (Number(localStorage.getItem('bolsillo')) >= Number(this.matricula)) {
          let datos = {monto:this.matricula,metodoPago:'bolsillo',idAcudiente:localStorage.getItem('idAcudiente'),valMes:this.pensionMensual,meses:this.pensionMeses,calendartype: this.calendarType,idPension:this.idPension}
          this.MatriculaService.pagoMatricula(datos).subscribe(response=>{
            Swal.fire(response.mensaje, '', (response.status)?'success':'error')
          },error=>{});
        }else{
          Swal.fire('Parece que no tienes fondos suficientes', 'Favor de ingresar fondos en el bolsillo', 'info')
        }
      }
    })
  }


}
