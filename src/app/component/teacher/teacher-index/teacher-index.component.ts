import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/models/teacher.model';
import { TeacherService } from 'src/app/services/teacher.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import Swal from'sweetalert2';

@Component({
  selector: 'app-teacher-index',
  templateUrl: './teacher-index.component.html',
  styleUrls: ['./teacher-index.component.css']
})
export class TeacherIndexComponent implements OnInit {

  grade !: any;
  navTitle="Gestión de docentes"
  formValue !:FormGroup
  public dataTeacher:any
  public filter:any;
  public filterText:any;
  teacherModel:Teacher = new Teacher();
  id !: any;
  constructor(
    private formBuilder:FormBuilder,
    private teacherService:TeacherService,
    private loginService:LoginService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.listTeachers()
    this.fieldCapture()
  }

  fieldCapture(){
    this.formValue = this.formBuilder.group({
      name: [''],
      course: [''],
      email: [''],
      isActive:['']

    })
  }
  listTeachers(){
    this.teacherService.listTeachers()
    .subscribe(res=>{
      this.dataTeacher=res.result
      console.log(this.dataTeacher)
    })
  }

  search(searchForm:any){

    if(this.filterText==""){
      this.listTeachers();
    }

    else {
      this.teacherService.listTeacher(searchForm.value.filtro)
      .subscribe(res=>{
        this.dataTeacher=res.result
        console.log(res.result)
      })
    }

  }

  deshabilitar(data:any){
   this.teacherModel.isActive = data.isActive
     if (data.isActive=1) {
      this.teacherModel.isActive= 0;
      Swal.fire(
        'Docente deshabilitado!',
        '',
        'warning'
       )
    }
    this.teacherService.deshabilitar(this.teacherModel,data.id)
    .subscribe(res=>{
    this.listTeachers()
    })
  }

  activar(data:any){
    this.teacherModel.isActive = data.isActive
     if (data.isActive==0) {
       this.teacherModel.isActive= 1;
       Swal.fire(
         'Docente habilitado!',
         '',
         'success'
        )
     }
 
     this.teacherService.deshabilitar(this.teacherModel,data.id)
     .subscribe(res=>{
     this.listTeachers()
     })
   }

  restablecerContrasena(data:any){
      this.loginService.recuperarContrasena(data.email).subscribe(
        response=>{
          console.log(response)
          if(response.mensaje=="El correo no se encuentra registrado en la bd"){
            Swal.fire(
              'El correo no existe!',
              '',
              'error'
             )
          }
  
          else{
            Swal.fire(
              'Se ha enviado un link al correo del acudiente!',
              '',
              'success'
             )
          }
        },
        error=>{
          console.log(error)
          alert(error)
        }
      )
  }

}
