import { Component, OnInit } from '@angular/core';
import { ExtracurricularService } from 'src/app/services/extracurricular.service';
import { Extracurricular } from 'src/app/models/extracurricular.model';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import Swal from'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-extracurricular-index',
  templateUrl: './extracurricular-index.component.html',
  styleUrls: ['./extracurricular-index.component.css']
})
export class ExtracurricularIndexComponent implements OnInit {
  public base_url = environment.url;
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
    this.fieldCapture();
  }

  fieldCapture(){
    this.formValue = this.formBuilder.group({
      activity:[''],
      startDate: [''],
      finalDate: [''],
      isActive:[''],
      teacher:[''],
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

  editExtracurricular(data:any){
    this.extracurricularModel.id = data.id
    this.formValue.controls['activity'].setValue(data.activity)
    this.formValue.controls['startDate'].setValue(data.startDate)
    this.formValue.controls['finalDate'].setValue(data.finalDate)
    this.formValue.controls['teacher'].setValue(data.teacher)

    if (data.isActive==0) {
      this.formValue.controls['isActive'].setValue(0)

    } else {
      this.formValue.controls['isActive'].setValue(1)
    }

  }

  updateExtracurricular(){

    this.extracurricularModel.activity= this.formValue.value.activity;
    this.extracurricularModel.startDate= this.formValue.value.startDate;
    this.extracurricularModel.finalDate= this.formValue.value.finalDate;
    this.extracurricularModel.teacher= this.formValue.value.teacher;
    this.extracurricularModel.isActive= this.formValue.value.isActive;


     if (this.extracurricularModel.isActive==2) {

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
          'Extracurricular actualizada!',
          '',
          'success'
         )
        this.listExtracurriculares()
      })
    }

    this.formValue = this.formBuilder.group({
      activity:[''],
      startDate: [''],
      finalDate: [''],
      isActive:[''],
      teacher:[''],
    })

  }

}
