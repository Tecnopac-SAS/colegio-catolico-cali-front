import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Teacher } from 'src/app/models/teacher.model';
import { TeacherService } from 'src/app/services/teacher.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-create',
  templateUrl: './teacher-create.component.html',
  styleUrls: ['./teacher-create.component.css']
})
export class TeacherCreateComponent implements OnInit {

  Teacher !: any;
  navTitle="Docente crear"
  public dataTransporte:any
  formValue!: FormGroup;
  formValueExtra!: FormGroup;
  teacherModel:Teacher= new Teacher();
  public mensaje_ok:any;
  public mensaje_error:any;
  constructor(
    private formBuilder:FormBuilder,
    private teacherService:TeacherService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.fieldCapture()

  }

  fieldCapture(){
    this.formValue = this.formBuilder.group({
      name: [''],
      course: [''],
      email: [''],
      number: [''],
      isActive:['']
    })
  }

  CrearTeacher(){
    this.teacherModel.name = this.formValue.value.name;
    this.teacherModel.course = this.formValue.value.course;
    this.teacherModel.email = this.formValue.value.email;
    this.teacherModel.number = this.formValue.value.number;

    if(this.teacherModel.name =="" ){
      this.mensaje_error="El campo nombre del docente no puede estar vacio"
    }

    else if(this.teacherModel.course  =="" ){
      this.mensaje_error="El campo curso no puede estar vacio"
    }

    else if(this.teacherModel.email  =="" ){
      this.mensaje_error="El campo email no puede estar vacio"
    }

    else if(this.teacherModel.number  == 0 ){
      this.mensaje_error="El campo número no puede estar vacio"
    }


    else{
      this.teacherService.createTeacher(this.teacherModel)
      .subscribe(res=>{
      console.log(res);
        if (res.mensaje=="el docente ya existe") {
          this.mensaje_error=res.mensaje;
        }
        else{
          this.mensaje_ok="Se registro correctamente"
          this.formValue = this.formBuilder.group({
            name: [''],
            course: [''],
            email: [''],
            isActive:[''],
            number: [''],
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
