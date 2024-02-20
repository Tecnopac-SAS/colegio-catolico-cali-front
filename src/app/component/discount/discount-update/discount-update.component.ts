import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Discount } from 'src/app/models/discount.model';
import { DiscountService } from 'src/app/services/discount.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from'sweetalert2'
import * as moment from 'moment';

@Component({
  selector: 'app-discount-update',
  templateUrl: './discount-update.component.html',
  styleUrls: ['./discount-update.component.css']
})
export class DiscountUpdateComponent implements OnInit {

  Discount !: any;
  navTitle="Editar descuento"
  public dataDiscount:any
  formValue!: FormGroup;
  formValueExtra!: FormGroup;
  DiscountModel:Discount= new Discount();
  public mensaje_ok:any;
  public mensaje_error:any;
  id !: any;
  constructor(
    private formBuilder:FormBuilder,
    private DiscountService:DiscountService,
    private router:Router,
    private route : ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.fieldCapture()

  }

  formatFecha(fecha:any){
    return (moment(fecha).format('YYYY-MM-DD')==='Invalid date')?'':moment(fecha).format('YYYY-MM-DD')
  }

  fieldCapture(){
    this.formValue = this.formBuilder.group({
      name: [''],
      starDate: [''],
      finalDate: [''],
      percentage:[''],
      frequency:[''],
      service:[''],
      isActive:[''],
      status:['']
    })
    this.fieldCaptureIndex()
  }

  fieldCaptureIndex(){
    this.route.params.subscribe(params=>{
      this.id = params['id'];
      this.DiscountService.obtenerDiscount(this.id).subscribe(
        response=>{
          this.Discount= response
          console.log(this.Discount)
          this.formValue.controls['name'].setValue(this.Discount.result.name)
          this.formValue.controls['starDate'].setValue(this.formatFecha(this.Discount.result.starDate))
          this.formValue.controls['finalDate'].setValue(this.formatFecha(this.Discount.result.finalDate))
          this.formValue.controls['percentage'].setValue(this.Discount.result.percentage)
          this.formValue.controls['frequency'].setValue(this.Discount.result.frequency)
          this.formValue.controls['service'].setValue(this.Discount.result.service)
          this.formValue.controls['isActive'].setValue(this.Discount.result.isActive)
          this.formValue.controls['status'].setValue(this.Discount.result.status)
          this.DiscountModel.id = this.Discount.result.id
        }
      )
    })
  }

  actualizarDiscount(){
    console.log(this.formValue.value)
    this.DiscountModel.name= this.formValue.value.name;
    this.DiscountModel.starDate= this.formValue.value.starDate;
    this.DiscountModel.finalDate= this.formValue.value.finalDate;
    this.DiscountModel.percentage= this.formValue.value.percentage;
    this.DiscountModel.frequency= this.formValue.value.frequency;
    this.DiscountModel.service= this.formValue.value.service;
    this.DiscountModel.isActive= this.formValue.value.isActive;
    this.DiscountModel.status= this.formValue.value.status;
    console.log(this.DiscountModel)

    if(this.DiscountModel.name =="" ){
      this.mensaje_error="El campo nombre no puede estar vacio"
    }

    else if(this.DiscountModel.starDate  == "" ){
      this.mensaje_error="El campo fecha de inicio no puede estar vacio"
    }

    else if(this.DiscountModel.finalDate  == "" ){
      this.mensaje_error="El campo fecha final no puede estar vacio"
    }

    else if(this.DiscountModel.percentage  == "" ){
      this.mensaje_error="El campo porcentaje no puede estar vacio"
    }

    else if(this.DiscountModel.frequency  == "" ){
      this.mensaje_error="El campo frecuencia no puede estar vacio"
    }

    else if(this.DiscountModel.service  == "" ){
      this.mensaje_error="El campo servicio no puede estar vacio"
    }
    else {
    this.DiscountService.updateDiscount(this.DiscountModel,this.id)
    .subscribe(res=>{

      Swal.fire(
        'Descuento actualizado!',
        'success'
       )
       setTimeout(() => {
          this.router.navigate(['discount']);
        }, 2000);
    })
   }
  }



  cerrarAlerta(){
    this.mensaje_error=""
  }

}
