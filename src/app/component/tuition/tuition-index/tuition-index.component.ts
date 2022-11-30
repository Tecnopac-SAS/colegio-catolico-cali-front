import { Component, OnInit } from '@angular/core';
import { TuitionService } from 'src/app/services/tuition.service';
import { Tuition } from 'src/app/models/tuition.model';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import Swal from'sweetalert2';

@Component({
  selector: 'app-tuition-index',
  templateUrl: './tuition-index.component.html',
  styleUrls: ['./tuition-index.component.css']
})
export class TuitionIndexComponent implements OnInit {
  grade !: any;
  navTitle="Matriculas"
  formValue !:FormGroup
  public dataTuition:any
  public filter:any;
  public filterText:any;
  tuitionModel:Tuition = new Tuition();
  constructor(
    private formBuilder:FormBuilder,
    private tuitionService:TuitionService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.listTuitions()
    this.fieldCapture()
  }

  fieldCapture(){
    this.formValue = this.formBuilder.group({
      grade:[''],
      price: [''],
      description: [''],
      isActive:[''],
    })
  }

  listTuitions(){
    this.tuitionService.listTuitions()
    .subscribe(res=>{
      this.dataTuition=res.result
      console.log(this.dataTuition)
    })
  }

  gradeList(){
    this.tuitionService.listGrades()
    .subscribe(res=>{
      this.grade=res.result
      console.log(this.grade)
    })

  }

  search(searchForm:any){

    if(this.filterText==""){
      this.listTuitions();
    }

    else {
      this.tuitionService.listTuition(searchForm.value.filtro)
      .subscribe(res=>{
        this.dataTuition=res.result
        console.log(res.result)
      })
    }

  }

  editTuition(tuition:any){
    this.gradeList()
    this.tuitionModel.id = tuition.id
    this.formValue.controls['grade'].setValue(tuition.grade)
    this.formValue.controls['price'].setValue(tuition.price)
    this.formValue.controls['description'].setValue(tuition.description)

    if (tuition.isActive==0) {
      this.formValue.controls['isActive'].setValue(0)

    } else {
      this.formValue.controls['isActive'].setValue(1)
    }

  }

  updateTuition(){

    this.tuitionModel.grade= this.formValue.value.grade;
    this.tuitionModel.price= this.formValue.value.price;
    this.tuitionModel.description= this.formValue.value.description;
    this.tuitionModel.isActive= this.formValue.value.isActive;
    this.tuitionModel.surcharge=10;


    if (this.tuitionModel.grade=="") {

      Swal.fire(
        'El campo grado no puede estar vacio!',
        '',
        'warning'
       )
    }

    else if (this.tuitionModel.isActive==2) {

      Swal.fire(
        'El campo estado no puede estar vacio!',
        '',
        'warning'
       )
    }

    else {
      console.log(this.tuitionModel)
      this.tuitionService.updateTuition(this.tuitionModel.id,this.tuitionModel)
      .subscribe(res=>{

        Swal.fire(
          'Matricula actualizada!',
          '',
          'success'
         )
        this.listTuitions()
      })
    }

    this.formValue = this.formBuilder.group({
      grade:[''],
      price: [''],
      description: [''],
      isActive:[''],
    })

  }

  deshabilitar(data:any){
    this.tuitionModel.isActive = data.isActive
      if (data.isActive=1) {
       this.tuitionModel.isActive= 0;
       Swal.fire(
         '¡Matricula deshabilitada!',
         '',
         'warning'
        )
     }
     this.tuitionService.deshabilitar(this.tuitionModel,data.id)
     .subscribe(res=>{
     this.listTuitions()
     })
   }
 
   activar(data:any){
     this.tuitionModel.isActive = data.isActive
      if (data.isActive==0) {
        this.tuitionModel.isActive= 1;
        Swal.fire(
          '¡Matricula habilitada!',
          '',
          'success'
         )
      }
  
      this.tuitionService.deshabilitar(this.tuitionModel,data.id)
      .subscribe(res=>{
      this.listTuitions()
      })
    }

}
