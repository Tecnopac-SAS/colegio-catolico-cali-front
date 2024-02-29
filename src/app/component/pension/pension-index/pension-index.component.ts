import { Component, OnInit } from '@angular/core';
import { PensionService } from 'src/app/services/pension.service';
import { CurrencyUtils } from 'src/utils/currencyUtils';
import { DiscountService } from 'src/app/services/discount.service';
import { Pension } from 'src/app/models/pension.model';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import Swal from'sweetalert2';

@Component({
  selector: 'app-pension-index',
  templateUrl: './pension-index.component.html',
  styleUrls: ['./pension-index.component.css']
})
export class PensionIndexComponent implements OnInit {
  grade !: any;
  navTitle="Pension"
  formValue !:FormGroup
  public dataPension:any
  public filter:any;
  public filterText:any;
  pensionModel:Pension = new Pension();
  currentDiscount: any;
  dataDiscount: any;
  constructor(
    private formBuilder:FormBuilder,
    private pensionService:PensionService,
    public currencyUtils: CurrencyUtils,
    public DiscountService:DiscountService,
    private router:Router
  ) {  }

  ngOnInit(): void {
    this.listPensions()
    this.fieldCapture()
  }

  fieldCapture(){
    this.formValue = this.formBuilder.group({
      price: [''],
      idGrade: [''],
      use: [''],
      isActive:[''],
      discount:[''],
    })
  }

  listPensions(){
    this.pensionService.listPensiones()
    .subscribe(res=>{
      this.dataPension=res.result
      // //Get discount
      // this.DiscountService.obtenerDiscount(res.result.discount).subscribe(
      //   res=>{
      //     this.currentDiscount = res.result
      // });
      console.log(this.dataPension)
    })
  }

  gradeList(){
    this.pensionService.listGrades()
    .subscribe(res=>{
      this.grade=res.result
      console.log(this.grade)
    })

  }

  search(searchForm:any){

    if(this.filterText==""){
      this.listPensions();
    }

    else {
      this.pensionService.listPension(searchForm.value.filtro)
      .subscribe(res=>{
        this.dataPension=res.result
        console.log(res.result)
      })
    }

  }

  editPension(pension:any){
    this.gradeList()
    this.pensionModel.id = pension.id
    this.formValue.controls['idGrade'].setValue(pension.idGrade)
    this.formValue.controls['price'].setValue(pension.price)
    this.formValue.controls['discount'].setValue(pension.discount)

    if (pension.isActive==0) {
      this.formValue.controls['isActive'].setValue(0)

    } else {
      this.formValue.controls['isActive'].setValue(1)
    }

  }

  updatePension(){

    this.pensionModel.price= this.formValue.value.price;
    this.pensionModel.discount= this.formValue.value.discount;
    this.pensionModel.isActive= this.formValue.value.isActive;
    this.pensionModel.idGrade= this.formValue.value.idGrade;



    if (this.pensionModel.price==0) {

      Swal.fire(
        'El campo precio no puede estar vacio!',
        '',
        'warning'
       )
    }

    else if (this.pensionModel.isActive==2) {

      Swal.fire(
        'El campo estado no puede estar vacio!',
        '',
        'warning'
       )
    }

    else {
      console.log(this.pensionModel)
      this.pensionService.updatePension(this.pensionModel.id,this.pensionModel)
      .subscribe(res=>{

        Swal.fire(
          'Pensión actualizada!',
          '',
          'success'
         )
        this.listPensions()
      })
    }

    this.formValue = this.formBuilder.group({
      price: [''],
      idGrade: [''],
      use: [''],
      isActive:[''],
      discount:[''],
    })

  }

  deshabilitar(data:any){
    this.pensionModel.isActive = data.isActive
      if (data.isActive=1) {
       this.pensionModel.isActive= 0;
       Swal.fire(
         '¡Pensión deshabilitada!',
         '',
         'warning'
        )
     }
     this.pensionService.deshabilitar(this.pensionModel,data.id)
     .subscribe(res=>{
     this.listPensions()
     })
   }
 
   activar(data:any){
     this.pensionModel.isActive = data.isActive
      if (data.isActive==0) {
        this.pensionModel.isActive= 1;
        Swal.fire(
          '¡Pensión habilitada!',
          '',
          'success'
         )
      }
  
      this.pensionService.deshabilitar(this.pensionModel,data.id)
      .subscribe(res=>{
      this.listPensions()
      })
    }
}
