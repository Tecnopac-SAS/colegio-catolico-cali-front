import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentDatabaseService } from 'src/app/services/student-database.service';
import { TuitionService } from 'src/app/services/tuition.service';
import { AvalPayService } from 'src/app/services/avalpay.service';
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
  lstuitiontransactionStatus: any;
  dataPagoAvalPay: any;
  constructor(
    private formBuilder:FormBuilder,
    private currencyUtils: CurrencyUtils,
    private AvalPayService:AvalPayService,
    private route: ActivatedRoute,
    private router:Router,
    private StudentService:StudentDatabaseService, private MatriculaService:TuitionService) { 
      this.pensionMensual=0
      this.pensionMeses=10
      this.lstuitiontransactionStatus = {};
      this.StudentService.getPension().subscribe(response=>{
        this.pension = JSON.stringify(response.result.price)
        this.porcentajeDesc = JSON.stringify(response.result.discount)
        this.idPension = JSON.stringify(response.result.id)
        this.configurarMatricula()
        this.descPagoAvalPay = '';
        this.dataPagoAvalPay = {};
      },error=>{
  
      });
      this.StudentService.getMatricula().subscribe(response=>{
        this.matricula = JSON.stringify(response.result)
      },error=>{
  
      });
    }

  ngOnInit(): void {
    this.validateTransactions()
  }
  formatCurrency(amount: number): string {
    return this.currencyUtils.formatCurrency(amount);
  }
  selectedTerms() {
    return this.pensionMeses === '10' || this.pensionMeses === '11' || this.pensionMeses === '12';
  }

  validateTransactions(){
    //Obtenemos el id de la transaccion
    this.route.queryParams.subscribe(params => {
      if(params['pmtId']){
        this.pmtId = params['pmtId'];
        this.AvalPayService.makePaymentStatus(this.pmtId).subscribe(response =>{
          let trnStatus = response.message.InvoicePmtInfo.PmtStatus.StatusDesc;
          let lstuitiontransactionStatus:any = localStorage.getItem('tuition-transaction-status');
          this.lstuitiontransactionStatus = JSON.parse(lstuitiontransactionStatus);
          
          if(trnStatus == 'Aprobada' && this.lstuitiontransactionStatus.trnStatus != true ){
            this.MatriculaService.pagoMatricula(this.lstuitiontransactionStatus.datos).subscribe(response=>{},error=>{});
            Swal.fire(
              'Transaccion Exitosa!',
              `#${this.pmtId} El pago de tu pensión fue ${trnStatus}`,
              'success'
            ).then((result) => {
                let trnNewStatus = this.lstuitiontransactionStatus.trnStatus = true;
                localStorage.setItem('tuition-transaction-status', JSON.stringify(this.lstuitiontransactionStatus));
                setTimeout(() => {
                  this.router.navigate(['/pago-matricula']);
                }, 1000);
            })
          }else{
            Swal.fire(
              'Hubo un error en la transacción!',
              `#${this.pmtId} El pago de tu pensión fue ${trnStatus}`,
              'error'
            ).then((result) => {
              setTimeout(() => {
                this.router.navigate(['/pago-matricula']);
              }, 1000);
          })
          }

        });
      }
    });
  }


  configurarMatricula(){
    if (this.pensionMeses!=undefined && this.pensionMeses!='') {
      switch (Number(this.pensionMeses)) {
        case 10:
          this.recargo =0
          let newPension = this.pension-Math.floor(this.pension*this.porcentajeDesc)/100
          this.pensionMensual = Number.parseFloat((newPension/this.pensionMeses) + this.recargo).toFixed(2);
          this.descPagoAvalPay = 'MATRÍCULA A 10 MESES';
          break;
        case 11:
          this.recargo =0
          this.pensionMensual = Number.parseFloat((this.pension/this.pensionMeses) + this.recargo).toFixed(2);
          this.descPagoAvalPay = 'MATRÍCULA A 11 MESES';
          break;
        case 12:
          this.recargo = Math.floor(this.pension*this.porcentajePenali)/100
          this.pensionMensual = Number.parseFloat((this.pension/this.pensionMeses) + this.recargo).toFixed(2);
          this.descPagoAvalPay = 'MATRÍCULA A 12 MESES';
          break;
      }
    }else{
      this.pensionMensual = 0
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
          let datos = {monto:this.matricula,metodoPago:'bolsillo',idAcudiente:localStorage.getItem('idAcudiente'),valMes:this.pensionMensual,meses:this.pensionMeses,idPension:this.idPension}
          this.MatriculaService.pagoMatricula(datos).subscribe(response=>{
            Swal.fire(response.mensaje, '', (response.status)?'success':'error')
          },error=>{

          });
        }else{
          Swal.fire('Parece que no tienes fondos suficientes', 'Favor de ingresar fondos en el bolsillo', 'info')
        }
      }
    })
  }
  pagarPensionAvalPay(amount: any, invoiceType = 1, desc = 'MATRÍCULA') {

    let urilocation = '';
    localStorage.removeItem('tuition-transaction-status');

    let datos = {
      monto:this.matricula,
      metodoPago:'AvalPay',
      idAcudiente:localStorage.getItem('idAcudiente'),
      valMes:this.pensionMensual,
      meses:this.pensionMeses,
      idPension:this.idPension
    }
    this.dataPagoAvalPay = datos;
    //Creamos la transaccion en el localStorage
    const localStorageTrsnData:any = {datos: this.dataPagoAvalPay, trnStatus: false }
    localStorage.setItem('tuition-transaction-status', JSON.stringify(localStorageTrsnData))
    
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
        // window.location.href = urilocation;
      }
    });
  }

}
