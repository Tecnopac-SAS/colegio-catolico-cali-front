import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BolsilloService } from 'src/app/services/bolsillo.service';
import { AvalPayService } from 'src/app/services/avalpay.service';
import { CurrencyUtils } from 'src/utils/currencyUtils';
import { ActivatedRoute } from '@angular/router';
//Avalpay
import { Avalpay } from 'src/utils/avalpay';
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
  //Avalpay
  paymentData: object;
  moduleName: string;
  amount: number;

  constructor(
    private formBuilder:FormBuilder,
    private bolsilloService:BolsilloService,
    private AvalPayService:AvalPayService,
    private route: ActivatedRoute,
    private router:Router,
    public currencyUtils: CurrencyUtils,
    //Avalpay
    public Avalpay: Avalpay,
    ) { 
      this.bolsillo =  localStorage.getItem('bolsillo')
      this.descPagoAvalPay = '';
      this.amount = 0;

      //Avalpay
      this.paymentData = {};
      this.moduleName = 'bolsillo';

      this.formValue = this.formBuilder.group({
        cant: ['', [Validators.required, Validators.min(0), Validators.max(5000)]]
      });
  }

  ngOnInit(): void {
    //Valida estado de matricula
    this.route.queryParams.subscribe(params => {
      if(params['pmtId']){
        this.pmtId = params['pmtId'];
        this.Avalpay.validateTransactions(this.pmtId, () => {
          // Pago de bolsillo
          this.recargarBolsillo()
        },() => {
          
          this.checkBolsillo()
          Swal.fire(
            'Bolsillo actualizado',
            '',
            'success'
          ).then((result) => {
            window.location.reload();
        })

        },'bolsillo', this.moduleName);
        
      }
    });
    this.fieldCapture()
    this.bolsillo = localStorage.getItem('bolsillo')
  }
  paymentAvalPayComponent(){
    this.paymentData = {
      monto:this.amount
    }
    this.Avalpay.paymentAvalPay(this.moduleName,this.paymentData, this.amount, 1, this.descPagoAvalPay)
  }
  validateNumber(event: Event): void {
    let numberInput: HTMLInputElement = event.target as HTMLInputElement;
    let inputValue: string = numberInput.value;
  
    // Verificar si el valor ingresado es numérico
    if (!(/^\d+$/.test(inputValue))) {
      // Si no es numérico, eliminar los caracteres no numéricos
      numberInput.value = inputValue.replace(/\D/g, '');
      return; // Salir de la función sin realizar más validaciones
    }
  
    let numericValue: number = parseFloat(inputValue);
    let minValue: number = 1000;
    let maxValue: number = 7000000;
    this.amount = parseFloat(inputValue);
  
    if (numericValue < minValue) {
      this.amount = minValue;
      numberInput.value = this.amount.toString();
    } else if (numericValue > maxValue) {
      this.amount = maxValue;
      numberInput.value = this.amount.toString();
    }else{
      this.disableButton = true; // Habilitar el botón
    }
    this.disableButton = false; // Habilitar el botón
  }
  fastAmount(value: number){
    let amountInput = document.getElementById('amout')  as HTMLInputElement;
    amountInput.value = '';
    this.amount = value;
    this.disableButton = false; // Habilitar el botón
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


  recargarBolsillo(){
    let lsBolsillo:string = localStorage.getItem('bolsillo-transaction-status') || '';
    this.bolsilloService.recarga(JSON.parse(lsBolsillo).data?.monto,localStorage.getItem('idAcudiente')).subscribe(
      response=>{},
      error=>{
        console.log(error)
        alert(error)
      }
    )
    console.log(this.formValue.value)
  }
}
