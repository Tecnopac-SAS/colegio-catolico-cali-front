import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BolsilloService } from 'src/app/services/bolsillo.service';
import { AvalPayService } from 'src/app/services/avalpay.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bolsillo',
  templateUrl: './bolsillo.component.html',
  styleUrls: ['./bolsillo.component.css']
})
export class BolsilloComponent implements OnInit {
  navTitle="Bolsillo"
  public bolsillo: any
  formValue!: FormGroup 
  public disableButton: boolean = true;
  descPagoAvalPay: string;
  pmtId: any;
  lsBolsillo: any;
  numberInput: any;

  constructor(
    private formBuilder:FormBuilder,
    private bolsilloService:BolsilloService,
    private AvalPayService:AvalPayService,
    private route: ActivatedRoute,
    private router:Router,
    ) { 
      this.bolsillo =  localStorage.getItem('bolsillo')
      this.descPagoAvalPay = '';
      this.numberInput = 0;
      this.formValue = this.formBuilder.group({
        cant: ['', [Validators.required, Validators.min(0), Validators.max(5000)]]
      });
  }

  ngOnInit(): void {
    this.validateTransactions()
    this.fieldCapture()
    this.bolsillo = localStorage.getItem('bolsillo')
  }

  validateNumber(event: any) {
    let numberInput: any = event.target;
    this.numberInput = numberInput.value;
    let number = parseFloat(numberInput.value);
    let minValue = 1;
    let maxValue = 5000000;
  
    if (number < minValue) {
      numberInput.value = minValue.toString();
      this.disableButton = true; // Deshabilitar el botón
    } else if (number > maxValue) {
      numberInput.value = maxValue.toString();
      this.disableButton = true; // Deshabilitar el botón
    } else {
      this.disableButton = false; // Habilitar el botón
    }
  }
  fieldCapture(){
    this.formValue= this.formBuilder.group({
      cant:['']
    })
  }
  checkBolsillo(){
    this.bolsilloService.getCant(localStorage.getItem('idAcudiente')).subscribe(response=>{
      this.bolsillo = response.resp
      
      localStorage.setItem('bolsillo',this.bolsillo)
    },error=>{

    });
  }


  validateTransactions(){
    //Obtenemos el id de la transaccion
    // this.route.queryParams.subscribe(params => {
    //   if(params['pmtId']){
    //     this.pmtId = params['pmtId'];
    //     this.AvalPayService.makePaymentStatus(this.pmtId).subscribe(response =>{

    //       let trnStatus = response.message.InvoicePmtInfo.PmtStatus.StatusDesc;
    //       let lstransactionStatus:any = localStorage.getItem('bolsillo-transaction-status');
    //       this.lsBolsillo = JSON.parse(lstransactionStatus);
          
    //       if(trnStatus == 'Aprobada' && this.lsBolsillo.trnStatus != true ){
    //         let datos = {pensiones:this.lsPensionesListSelect.months}
    //         this.pensionService.pagoPension(datos,'AvalPay').subscribe(response=>{},error=>{});
    //         Swal.fire(
    //           'Transaccion Exitosa!',
    //           `#${this.pmtId} El pago de tu pensión fue ${trnStatus}`,
    //           'success'
    //         ).then((result) => {
    //             let trnNewStatus = this.lsPensionesListSelect.trnStatus = true;
    //             localStorage.setItem('transaction-status', JSON.stringify(this.lsPensionesListSelect));
    //             setTimeout(() => {
    //               this.router.navigate(['/pago-pension']);
    //               this.getListPensiones()
    //             }, 1000);
    //         })
    //       }else{
    //         Swal.fire(
    //           'Hubo un error en la transacción!',
    //           `#${this.pmtId} El pago de tu pensión fue ${trnStatus}`,
    //           'error'
    //         ).then((result) => {
    //           setTimeout(() => {
    //             this.router.navigate(['/pago-pension']);
    //           }, 1000);
    //       })
    //       }

    //     });
    //   }
    // });
  }



  recargarBolsilloAvalPay(amount: any, invoiceType = 1, desc = 'RECARGA BOLSILLO') {

    let urilocation = '';
    localStorage.removeItem('bolsillo-transaction-status');
    //Creamos la transaccion en el localStorage
    const localStorageTrsnData:any = { trnStatus: false }
    localStorage.setItem('bolsillo-transaction-status', JSON.stringify(localStorageTrsnData))
    
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

  recargarBolsillo(){
    this.bolsilloService.recarga(this.formValue.value,localStorage.getItem('idAcudiente')).subscribe(
      response=>{
        if (response.mensaje=='ok') {
          this.checkBolsillo()
          Swal.fire(
            'Bolsillo actualizado',
            '',
            'success'
          ).then((result) => {
            window.location.reload();
        })
          this.formValue= this.formBuilder.group({
            cant:['']
          })
        }

      },
      error=>{
        console.log(error)
        alert(error)
      }
    )
    console.log(this.formValue.value)
  }
}
