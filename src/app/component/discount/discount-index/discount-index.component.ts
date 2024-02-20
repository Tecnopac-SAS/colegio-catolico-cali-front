import { Component, OnInit } from '@angular/core';
import { DiscountService } from 'src/app/services/discount.service';
import { Discount } from 'src/app/models/discount.model';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import Swal from'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-discount-index',
  templateUrl: './discount-index.component.html',
  styleUrls: ['./discount-index.component.css']
})
export class DiscountIndexComponent implements OnInit {

  grade !: any;
  navTitle="Descuentos"
  formValue !:FormGroup
  public dataDiscount:any
  public filter:any;
  public filterText:any;
  DiscountModel:Discount = new Discount();
  id !: any;
  constructor(
    private formBuilder:FormBuilder,
    private DiscountService:DiscountService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.listDiscounts()
    this.fieldCapture()
  }


  formatFecha(fecha:any){
    return (moment(fecha).format('DD/MM/YYYY')==='Invalid date')?'':moment(fecha).format('DD/MM/YYYY')
  }

  fieldCapture(){
    this.formValue = this.formBuilder.group({
      name: [''],
      starDate: [''],
      finalDate: [''],
      percentage:[''],
      frequency:[''],
      service:[''],
      isActive:['']

    })
  }

  listDiscounts(){
    this.DiscountService.listDiscounts()
    .subscribe(res=>{
      this.dataDiscount=res.result
      console.log(this.dataDiscount)
    })
  }

  search(searchForm:any){

    if(this.filterText==""){
      this.listDiscounts();
    }

    else {
      this.DiscountService.listDiscount(searchForm.value.filtro)
      .subscribe(res=>{
        this.dataDiscount=res.result
        console.log(res.result)
      })
    }

  }

  eliminar(data:any){
    this.DiscountModel.isActive = data.isActive
      if (data.isActive=1) {
       this.DiscountModel.isActive= 0;
       Swal.fire(
         'Descuento Eliminado!',
         '',
         'success'
        )
     }
     this.DiscountService.eliminar(this.DiscountModel,data.id)
     .subscribe(res=>{
      this.listDiscounts()
     })
   }
 
   activar(data:any){
     this.DiscountModel.isActive = data.isActive
      if (data.isActive==0) {
        this.DiscountModel.isActive= 1;
        Swal.fire(
          'Descuento habilitado!',
          '',
          'success'
         )
      }
  
      this.DiscountService.deshabilitar(this.DiscountModel,data.id)
      .subscribe(res=>{
      this.listDiscounts()
      })
    }

}
