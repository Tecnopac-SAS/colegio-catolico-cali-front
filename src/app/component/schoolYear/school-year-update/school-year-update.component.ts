import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { SchoolYear } from 'src/app/models/schoolYear.model';
import { SchoolYearService } from 'src/app/services/school-year.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from'sweetalert2'

@Component({
  selector: 'app-school-year-update',
  templateUrl: './school-year-update.component.html',
  styleUrls: ['./school-year-update.component.css']
})
export class SchoolYearUpdateComponent implements OnInit {

  SchoolYear !: any;
  navTitle="Año lectivo editar"
  public dataSchoolYear:any
  formValue!: FormGroup;
  formValueExtra!: FormGroup;
  SchoolYearModel:SchoolYear= new SchoolYear();
  public mensaje_ok:any;
  public mensaje_error:any;
  id !: any;
  constructor(
    private formBuilder:FormBuilder,
    private SchoolYearService:SchoolYearService,
    private router:Router,
    private route : ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.fieldCapture()

  }

  fieldCapture(){
    this.formValue = this.formBuilder.group({
      code: [''],
      age: [''],
    })
    this.fieldCaptureIndex()
  }

  fieldCaptureIndex(){
    this.route.params.subscribe(params=>{
      this.id = params['id'];
      this.SchoolYearService.obtenerSchoolYear(this.id).subscribe(
        response=>{
          this.SchoolYear= response
          console.log(this.SchoolYear)
          this.formValue.controls['code'].setValue(this.SchoolYear.result.code)
          this.formValue.controls['age'].setValue(this.SchoolYear.result.age)
          this.SchoolYearModel.id = this.SchoolYear.result.id
        }
      )
    })
  }

  actualizarSchoolYear(){
    console.log(this.formValue.value)
    this.SchoolYearModel.code= this.formValue.value.code;
    this.SchoolYearModel.age= this.formValue.value.age;
    this.SchoolYearModel.isActive= this.formValue.value.isActive;
    console.log(this.SchoolYearModel)

    if(this.SchoolYearModel.code =="" ){
      this.mensaje_error="El campo código no puede estar vacio"
    }

    else if(this.SchoolYearModel.age  == "" ){
      this.mensaje_error="El campo año lectivo no puede estar vacio"
    }

    else {

    this.SchoolYearService.updateSchoolYear(this.SchoolYearModel,this.id)
    .subscribe(res=>{

      Swal.fire(
        'Año lectivo actualizado!',
        '',
        'success'
       )
       setTimeout(() => {
          this.router.navigate(['año-lectivo']);
        }, 2000);
    })
   }
  }



  cerrarAlerta(){
    this.mensaje_error=""
  }

}
