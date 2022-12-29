import { Component, OnInit } from '@angular/core';
import { StudentDatabase } from 'src/app/models/studentDatabase.model';
import { StudentDatabaseService } from 'src/app/services/student-database.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import Swal from'sweetalert2';

@Component({
  selector: 'app-student-database-sin-inscribir',
  templateUrl: './student-database-sin-inscribir.component.html',
  styleUrls: ['./student-database-sin-inscribir.component.css']
})
export class StudentDatabaseSinInscribirComponent implements OnInit {

  grade !: any;
  navTitle="Estudiantes sin inscribir"
  formValue !:FormGroup
  public dataStudentDatabase:any
  public filter:any;
  public filterText:any;
  studentDatabaseModel:StudentDatabase = new StudentDatabase();
  id !: any;
  constructor(
    private formBuilder:FormBuilder,
    private StudentDatabaseService:StudentDatabaseService,
    private loginService:LoginService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.listarCriterio()
    this.fieldCapture()
  }

  fieldCapture(){
    this.formValue = this.formBuilder.group({
      code: [''],
      name: [''],
      surname: [''],
      email:[''],
      pension:[''],
      balance:[''],
      isActive:['']

    })
  }

  listarCriterio(){
      this.StudentDatabaseService.listStudentDatabaseTipo("Aspirante")
      .subscribe(res=>{
        this.dataStudentDatabase=res.result
        console.log(res.result)
      })
  }

  search(searchForm:any){

    if(this.filterText==""){
      this.listarCriterio()
    }

    else {
      this.StudentDatabaseService.listStudentDatabase(searchForm.value.filtro,"Aspirante")
      .subscribe(res=>{
        this.dataStudentDatabase=res.result
        console.log(res.result)
      })
    }

  }

  deshabilitar(data:any){
   this.studentDatabaseModel.isActive = data.isActive
     if (data.isActive=1) {
      this.studentDatabaseModel.isActive= 0;
      Swal.fire(
        'Acudiente deshabilitado!',
        '',
        'warning'
       )
    }
    this.StudentDatabaseService.deshabilitar(this.studentDatabaseModel,data.id)
    .subscribe(res=>{
    //this.listStudentDatabases()
    })
  }

  actualizarEstado(data:any, estado:any){
     this.studentDatabaseModel.estadoEstudiante = estado
     this.StudentDatabaseService.updateStudentDatabaseEstado(this.studentDatabaseModel,data.id)
     .subscribe(res=>{
      this.listarCriterio()
     if (res) {
      Swal.fire(
        '¡Cambio de estado exitoso!',
        '',
        'success'
       )
      
     } else {
      Swal.fire(
        '¡No se logró actualizar el estado!',
        '',
        'error'
       )
      
     }
     })
   
  
   }

  activar(data:any){
    this.studentDatabaseModel.isActive = data.isActive
     if (data.isActive==0) {
       this.studentDatabaseModel.isActive= 1;
       Swal.fire(
         'Acudiente habilitado!',
         '',
         'success'
        )
     }
 
     this.StudentDatabaseService.deshabilitar(this.studentDatabaseModel,data.id)
     .subscribe(res=>{
     //this.listStudentDatabases()
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
