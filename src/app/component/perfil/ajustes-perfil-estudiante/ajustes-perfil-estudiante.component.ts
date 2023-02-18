import { Component, OnInit } from '@angular/core';
import { StudentDatabaseService } from 'src/app/services/student-database.service';
import * as moment from 'moment';

@Component({
  selector: 'app-ajustes-perfil-estudiante',
  templateUrl: './ajustes-perfil-estudiante.component.html',
  styleUrls: ['./ajustes-perfil-estudiante.component.css']
})
export class AjustesPerfilEstudianteComponent implements OnInit {
  public student:any;

  constructor(private studentDatabaseService:StudentDatabaseService) { 
    this.student={ nombres:'',apellidos:'',tipoDocumento:'',identificacion:'',expedicion:'',lugarNacimiento:'',fechaNacimiento:'',edad:'',direccion:'',tipoDireccion:'',barrio:'',estrato:'',telefono:'',correo:'',tipoCupo:''}
  }

  ngOnInit( ): void {
    this.getDatos();
  }
  getDatos(){
    this.studentDatabaseService.obtenerStudentDatabase(Number(localStorage.getItem('idEstudiante'))).subscribe(
      (res:any)=>{
        this.student={...res.result,fechaNacimiento:this.formatFecha(res.result.fechaNacimiento)};
      }
    )
  }
  formatFecha(fecha:any){
    return (moment(fecha).format('DD/MM/YYYY')==='Invalid date')?'':moment(fecha).format('YYYY-MM-DD')
  }
  actualizarDatos(){
    this.studentDatabaseService.updateStudentDatabase(this.student,Number(localStorage.getItem('idEstudiante'))).subscribe(
      (res:any)=>{
        console.log(res);
      }
    )
  }

}
