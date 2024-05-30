import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Deudas } from 'src/app/models/deudas.model';
import { DeudasService } from 'src/app/services/deudas.service';
import { CurrencyUtils } from 'src/utils/currencyUtils';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';


@Component({
  selector: 'app-deudas-view',
  templateUrl: './deudas-view.component.html',
  styleUrls: ['./deudas-view.component.css']
})
export class DeudasViewComponent implements OnInit {

  deuda !: any;
  navTitle="Ver Deuda"
  public dataTransporte:any
  formValue!: FormGroup;
  formValueExtra!: FormGroup;
  id !: any;



  DeudasModel:Deudas= new Deudas();
  public mensaje_ok:any;
  public mensaje_error:any;
  constructor(
    private formBuilder:FormBuilder,
    private DeudasService:DeudasService,
    private currencyUtils: CurrencyUtils,
    private router:Router,
    private route : ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.fieldCapture()
  }

  fieldCapture(){
    this.formValue = this.formBuilder.group({
      deudaCode: [''],
      concepto: [''],
      fechaInicio:[''],
      fechaFinal:[''],
      monto:[''],
      cobro:[''],
      cobroValue:['']
    });
    this.fieldCaptureIndex();
  }

  fieldCaptureIndex(){

    this.route.params.subscribe(params=>{
      console.log(params.id);
      this.id = params.id;
      this.DeudasService.consultarDeuda(2).subscribe(
        response=>{
          console.log(response);
          this.deuda= response.result
          console.log(this.deuda)
          this.formValue.controls['deudaCode'].setValue(this.deuda.deudaCode)
          this.formValue.controls['concepto'].setValue(this.deuda.concepto)
          this.formValue.controls['fechaInicio'].setValue(this.formatFecha(this.deuda.fechaInicio))
          this.formValue.controls['fechaFinal'].setValue(this.formatFecha(this.deuda.fechaFinal))
          this.formValue.controls['monto'].setValue(this.deuda.monto)
          this.formValue.controls['cobro'].setValue(this.deuda.cobro)
          this.formValue.controls['cobroValue'].setValue(this.deuda.cobroValue)
        }
      )
    })
  }


  formatCurrency(amount: number): string {
    return this.currencyUtils.formatCurrency(amount);
  }
  formatFecha(fecha:any){
    return (moment(fecha).format('YYYY-MM-DD')==='Invalid date')?'':moment(fecha).format('YYYY-MM-DD')
  }


  cerrarAlerta(){
    this.mensaje_error=""
  }

}
