import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Discount } from 'src/app/models/discount.model';
import { DiscountService } from 'src/app/services/discount.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-discount-create',
  templateUrl: './discount-create.component.html',
  styleUrls: ['./discount-create.component.css']
})
export class DiscountCreateComponent implements OnInit {

  Discount !: any;
  navTitle="Descuento crear"
  public dataTransporte:any
  formValue!: FormGroup;
  formValueExtra!: FormGroup;
  DiscountModel:Discount= new Discount();
  public mensaje_ok:any;
  public mensaje_error:any;
  constructor(
    private formBuilder:FormBuilder,
    private DiscountService:DiscountService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.fieldCapture()

  }

  fieldCapture(){
    this.formValue = this.formBuilder.group({
      name: [''],
      starDate: [''],
      finalDate: [''],
      percentage:[''],
      useType:[1],
      frequency:[''],
      service:[''],
      isActive:[''],
      status:['']
    })
  }

  CrearDiscount(){
    this.DiscountModel.name = this.formValue.value.name;
    this.DiscountModel.starDate = this.formValue.value.starDate;
    this.DiscountModel.finalDate = this.formValue.value.finalDate;
    this.DiscountModel.percentage = this.formValue.value.percentage;
    this.DiscountModel.useType = this.formValue.value.useType;
    this.DiscountModel.frequency = this.formValue.value.frequency;
    this.DiscountModel.service = this.formValue.value.service;
    this.DiscountModel.isActive = this.formValue.value.isActive;
    this.DiscountModel.status = this.formValue.value.status;

    if(this.DiscountModel.name =="" ){
      this.mensaje_error="El campo nombre no puede estar vacio"
    }

    else if(this.DiscountModel.starDate  == "" ){
      this.mensaje_error="El campo fecha de inicio no puede estar vacio"
    }
    else if(this.DiscountModel.status  == null ){
      this.mensaje_error="El campo estado no puede estar vacio"
    }
    else if(this.DiscountModel.finalDate  == "" ){
      this.mensaje_error="El campo fecha final no puede estar vacio"
    }

    else if(this.DiscountModel.percentage  == "" ){
      this.mensaje_error="El campo porcentaje no puede estar vacio"
    }

    else if(this.DiscountModel.useType  != 0 &&  this.DiscountModel.useType  != 1){
      this.mensaje_error="El campo tipo de uso no puede estar vacio"
    }

    else if(this.DiscountModel.frequency  < 1 ){
      this.mensaje_error="El campo frecuencia no puede estar vacio"
    }

    else if(this.DiscountModel.service  == "" ){
      this.mensaje_error="El campo servicio no puede estar vacio"
    }



    else{
      this.DiscountService.createDiscount(this.DiscountModel)
      .subscribe(res=>{
      console.log(res);
        if (res.mensaje=="el dato ya existe") {
          this.mensaje_error=res.mensaje;
        }
        else{
          this.mensaje_ok="Se registro correctamente"
          this.formValue = this.formBuilder.group({
            name: [''],
            starDate: [''],
            finalDate: [''],
            percentage:[''],
            useType:[''],
            frequency:[''],
            service:[''],
            isActive:[''],
            status:['']
          })
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
