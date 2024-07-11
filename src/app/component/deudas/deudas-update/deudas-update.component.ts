import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Deudas } from 'src/app/models/deudas.model';
import { DeudasService } from 'src/app/services/deudas.service';
import { CurrencyUtils } from 'src/utils/currencyUtils';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';


@Component({
  selector: 'app-deudas-update',
  templateUrl: './deudas-update.component.html',
  styleUrls: ['./deudas-update.component.css']
})
export class DeudasUpdateComponent implements OnInit {

  deuda !: any;
  navTitle="Editar Deuda"
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
      this.DeudasService.consultarDeuda(this.id).subscribe(
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
        }
      )
    })
  }


  formatCurrency(amount: number): string {
    return this.currencyUtils.formatCurrency(amount);
  }
  formatFecha(fecha:any){
    return (moment(fecha).format('yyyy-MM-DD')==='Invalid date')?'':moment(fecha).format('yyyy-MM-DD')
  }

  ActualizarDeuda(){
    this.DeudasModel.deudaCode = this.formValue.value.deudaCode;
    this.DeudasModel.concepto = this.formValue.value.concepto;
    this.DeudasModel.fechaInicio = this.formValue.value.fechaInicio;
    this.DeudasModel.fechaFinal = this.formValue.value.fechaFinal;
    this.DeudasModel.estado = this.formValue.value.estado;
    this.DeudasModel.monto = this.formValue.value.monto;
    this.DeudasModel.cobro = this.formValue.value.cobro;
    this.DeudasModel.cobroValue = this.formValue.value.cobroValue;

    if(this.DeudasModel.concepto =="" ){
      this.mensaje_error="El campo concepto no puede estar vacio"
    }
    else if(this.DeudasModel.fechaInicio  == "" ){
      this.mensaje_error="El Fecha Inicio no puede estar vacio"
    }
    else if(this.DeudasModel.fechaFinal  == "" ){
      this.mensaje_error="El Fecha Final no puede estar vacio"
    }
    else if(this.DeudasModel.monto  == 0){
      this.mensaje_error="El campo monto no puede estar vacio"
    }
    else{
      this.DeudasService.editarDeuda(this.DeudasModel, this.id)
      .subscribe(res=>{
      console.log(res);
        if (res.mensaje=="el dato ya existe") {
          this.mensaje_error=res.mensaje;
        }
        else{
          this.mensaje_ok="Se registro correctamente"
        }
      },
      err=>{
        console.log(err)
      })
    }
  }

  cerrarAlerta(){
    this.mensaje_error=""
  }

}
