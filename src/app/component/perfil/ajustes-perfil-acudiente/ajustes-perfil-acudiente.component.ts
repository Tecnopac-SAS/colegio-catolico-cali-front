import { Component, OnInit } from '@angular/core';
import { StudentDatabaseService } from 'src/app/services/student-database.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajustes-perfil-acudiente',
  templateUrl: './ajustes-perfil-acudiente.component.html',
  styleUrls: ['./ajustes-perfil-acudiente.component.css']
})
export class AjustesPerfilAcudienteComponent implements OnInit {
  public acudiente:any;
  public madre:any;
  public padre:any;
  public responsable:any;
  public estudiante:any;

  constructor(private studentDatabaseService:StudentDatabaseService) {
    this.acudiente={ nombres:'',apellidos:'',tipoDocumento:'',identificacion:'',expedicion:'',lugarNacimiento:'',fechaNacimiento:'',edad:'',direccion:'',tipoDireccion:'',barrio:'',estrato:'',telefono:'',correo:'',tipoCupo:''}
    this.madre={ nombres:'',apellidos:'',tipoDocumento:'',identificacion:'',expedicion:'',lugarNacimiento:'',fechaNacimiento:'',edad:'',direccion:'',tipoDireccion:'',barrio:'',estrato:'',telefono:'',correo:'',tipoCupo:''}
    this.padre={ nombres:'',apellidos:'',tipoDocumento:'',identificacion:'',expedicion:'',lugarNacimiento:'',fechaNacimiento:'',edad:'',direccion:'',tipoDireccion:'',barrio:'',estrato:'',telefono:'',correo:'',tipoCupo:''}
    this.responsable={ nombres:'',apellidos:'',tipoDocumento:'',identificacion:'',expedicion:'',lugarNacimiento:'',fechaNacimiento:'',edad:'',direccion:'',tipoDireccion:'',barrio:'',estrato:'',telefono:'',correo:'',tipoCupo:''}
    this.estudiante = {viveCon:''}
    
  }

  ngOnInit(): void {
    this.getDatosEstudiante();
  }
  getDatosEstudiante(){
    this.studentDatabaseService.getAllAcudiente(Number(localStorage.getItem('idAcudiente'))).subscribe(
      (res:any)=>{
        this.acudiente={...res.result.acudiente,fechaNacimiento:this.formatFecha(res.result.acudiente.fechaNacimiento)};
        this.madre={...res.result.madre,fechaNacimiento:this.formatFecha(res.result.madre.fechaNacimiento)};
        this.padre={...res.result.padre,fechaNacimiento:this.formatFecha(res.result.madre.fechaNacimiento)};
        this.responsable={...res.result.responsable,fechaNacimiento:this.formatFecha(res.result.madre.fechaNacimiento)};
        this.estudiante={viveCon:res.result.acudiente.acudienteAsEstudiante.viveCon,id:res.result.acudiente.acudienteAsEstudiante.id};
      }
    )
  }
  actualizar(){
    if (this.estudiante.viveCon) {
      let data = {acudiente:this.acudiente,madre:this.madre,padre:this.padre,responsable:this.responsable,estudiante:this.estudiante}
      this.studentDatabaseService.actualizarAcudiente(data,Number(localStorage.getItem('idAcudiente'))).subscribe(
        (res:any)=>{
          Swal.fire({
            icon: (res.status)?'success':'error',
            title: res.mensaje,
          })
        }
      )
    }else{
      Swal.fire({
        icon: 'error',
        title: 'El campo "Con quien vive" es obligatorio',
      })
    }
  }
  formatFecha(fecha:any){
    return (moment(fecha).format('DD/MM/YYYY')==='Invalid date')?'':moment(fecha).format('YYYY-MM-DD')
  }
}
