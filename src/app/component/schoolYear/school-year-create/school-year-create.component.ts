import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { SchoolYear } from 'src/app/models/schoolYear.model';
import { SchoolYearService } from 'src/app/services/school-year.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-school-year-create',
  templateUrl: './school-year-create.component.html',
  styleUrls: ['./school-year-create.component.css']
})
export class SchoolYearCreateComponent implements OnInit {

  SchoolYear !: any;
  navTitle="Crear año lectivo"
  public dataSchoolYear:any
  formValue!: FormGroup;
  formValueExtra!: FormGroup;
  SchoolYearModel:SchoolYear= new SchoolYear();
  public mensaje_ok:any;
  public mensaje_error:any;
  constructor(
    private formBuilder:FormBuilder,
    private SchoolYearService:SchoolYearService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.fieldCapture()

  }

  fieldCapture(){
    this.formValue = this.formBuilder.group({
      code: [''],
      age: [''],
    })
  }

  CrearSchoolYear(){
    this.SchoolYearModel.code = this.formValue.value.code;
    this.SchoolYearModel.age = this.formValue.value.age;
    this.SchoolYearModel.isActive = this.formValue.value.isActive;

    if(this.SchoolYearModel.code =="" ){
      this.mensaje_error="El campo código no puede estar vacio"
    }

    else if(this.SchoolYearModel.age  == "" ){
      this.mensaje_error="El campo año lectivo no puede estar vacio"
    }

    else{
      this.SchoolYearService.createSchoolYear(this.SchoolYearModel)
      .subscribe(res=>{
      console.log(res);
        if (res.mensaje=="el dato ya existe") {
          this.mensaje_error=res.mensaje;
        }
        else{
          this.mensaje_ok="Se registro correctamente"
          this.formValue = this.formBuilder.group({
            code: [''],
            age: [''],
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
