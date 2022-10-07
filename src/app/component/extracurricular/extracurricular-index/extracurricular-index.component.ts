import { Component, OnInit } from '@angular/core';
import { ExtracurricularService } from 'src/app/services/extracurricular.service';
import { Extracurricular } from 'src/app/models/extracurricular.model';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import Swal from'sweetalert2';

@Component({
  selector: 'app-extracurricular-index',
  templateUrl: './extracurricular-index.component.html',
  styleUrls: ['./extracurricular-index.component.css']
})
export class ExtracurricularIndexComponent implements OnInit {

  grade !: any;
  navTitle="Extracurricular"
  formValue !:FormGroup
  public dataExtracurricular:any
  public filter:any;
  public filterText:any;
  extracurricularModel:Extracurricular = new Extracurricular();
  constructor(
    private formBuilder:FormBuilder,
    private extracurricularService:ExtracurricularService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.listExtracurriculares()
  }

  fieldCapture(){
    this.formValue = this.formBuilder.group({
      grade:[''],
      price: [''],
      description: [''],
      isActive:[''],
    })
  }

  listExtracurriculares(){
    this.extracurricularService.listExtracurriculares()
    .subscribe(res=>{
      this.dataExtracurricular=res.result
      console.log(this.dataExtracurricular)
    })
  }

  search(searchForm:any){

    if(this.filterText==""){
      this.listExtracurriculares();
    }

    else {
      this.extracurricularService.listExtracurricular(searchForm.value.filtro)
      .subscribe(res=>{
        this.dataExtracurricular=res.result
        console.log(res.result)
      })
    }

  }

  editTuition(tuition:any){
    this.listExtracurriculares()
    this.extracurricularModel.id = tuition.id
    this.formValue.controls['grade'].setValue(tuition.idGrade)
    this.formValue.controls['price'].setValue(tuition.price)
    this.formValue.controls['description'].setValue(tuition.description)

    if (tuition.isActive==0) {
      this.formValue.controls['isActive'].setValue(0)

    } else {
      this.formValue.controls['isActive'].setValue(1)
    }

  }

  updateTuition(){

    this.extracurricularModel.imagen= this.formValue.value.grade;
    this.extracurricularModel.startDate= this.formValue.value.price;
    this.extracurricularModel.finalDate= this.formValue.value.description;
    this.extracurricularModel.teacher= this.formValue.value.isActive;


    if (this.extracurricularModel.imagen=="") {

      Swal.fire(
        'El campo grado no puede estar vacio!',
        '',
        'warning'
       )
    }

    else if (this.extracurricularModel.isActive==2) {

      Swal.fire(
        'El campo estado no puede estar vacio!',
        '',
        'warning'
       )
    }

    else {
      console.log(this.extracurricularModel)
      this.extracurricularService.updateExtracurricular(this.extracurricularModel.id,this.extracurricularModel)
      .subscribe(res=>{

        Swal.fire(
          'Matricula actualizada!',
          '',
          'success'
         )
        this.listExtracurriculares()
      })
    }

    this.formValue = this.formBuilder.group({
      grade:[''],
      price: [''],
      description: [''],
      isActive:[''],
    })

  }

}
