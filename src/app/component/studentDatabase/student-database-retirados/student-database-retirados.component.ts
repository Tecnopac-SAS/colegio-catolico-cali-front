import { Component, OnInit } from '@angular/core';
import { StudentDatabase } from 'src/app/models/studentDatabase.model';
import { StudentDatabaseService } from 'src/app/services/student-database.service';
import { AcudienteService } from 'src/app/services/acudiente.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import Swal from'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-student-database-retirados',
  templateUrl: './student-database-retirados.component.html',
  styleUrls: ['./student-database-retirados.component.css']
})
export class StudentDatabaseRetiradosComponent implements OnInit {
  tipoContenido: string;
  grade !: any;
  idEstudiante: any;

  public acudiente:any;
  public madre:any;
  public padre:any;
  public responsable:any;
  public estudiante:any;

  navTitle="Estudiantes retirados"
  formValue !:FormGroup
  public dataStudentDatabase:any
  public filter:any;
  public filterText:any;
  studentDatabaseModel:StudentDatabase = new StudentDatabase();
  id !: any;
  constructor(
    private formBuilder:FormBuilder,
    private StudentDatabaseService:StudentDatabaseService,
    private AcudienteService:AcudienteService,
    private loginService:LoginService,
    private router:Router
  ) { 
        this.tipoContenido = '';
  }

  ngOnInit(): void {
    this.listarCriterio()
    this.fieldCapture()
  }

  listarEstudiante(id:any){
    this.StudentDatabaseService.obtenerStudentDatabase(Number(id))
    .subscribe(response => {
      this.estudiante = response.result;
    });
  }
  listarDatos(id:any){
    this.AcudienteService.getAcudientebyEstudiante({idEstudiante: Number(id)})
    .subscribe(response => {
      this.acudiente = response.result;
      this.StudentDatabaseService.getAllAcudiente(Number(this.acudiente[0].id)).subscribe((res:any)=>{
          this.madre={...res.result?.madre,fechaNacimiento:this.formatFecha(res.result?.madre?.fechaNacimiento)};
          this.padre={...res.result?.padre,fechaNacimiento:this.formatFecha(res.result?.madre?.fechaNacimiento)};
          this.responsable={...res.result?.responsable,fechaNacimiento:this.formatFecha(res.result?.madre?.fechaNacimiento)};
        }
      )
    });
  }

  formatFecha(fecha:any){
    return (moment(fecha).format('DD/MM/YYYY')==='Invalid date')?'':moment(fecha).format('YYYY-MM-DD')
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
      this.StudentDatabaseService.listStudentDatabaseTipo("Graduado")
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
      this.StudentDatabaseService.listStudentDatabase(searchForm.value.filtro,"Matriculado")
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
