import { Component, OnInit } from '@angular/core';
import { AttendingManagements } from 'src/app/models/attendingManagements.model';
import { AttendingManagementsService } from 'src/app/services/attending-managements.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import Swal from'sweetalert2';

@Component({
  selector: 'app-attending-managements-index',
  templateUrl: './attending-managements-index.component.html',
  styleUrls: ['./attending-managements-index.component.css']
})
export class AttendingManagementsIndexComponent implements OnInit {

  grade !: any;
  navTitle="Gestión de acudientes"
  formValue !:FormGroup
  public dataAttendingManagements:any
  public filter:any;
  public filterText:any;
  attendingManagementsModel:AttendingManagements = new AttendingManagements();
  id !: any;
  constructor(
    private formBuilder:FormBuilder,
    private attendingManagementsService:AttendingManagementsService,
    private loginService:LoginService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.listAttendingManagementss()
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

  listAttendingManagementss(){
    this.attendingManagementsService.listAttendingManagements()
    .subscribe(res=>{
      this.dataAttendingManagements=res.result
    })
  }

  deshabilitar(data:any){
   this.attendingManagementsModel.isActive = data.isActive
     if (data.isActive=1) {
      this.attendingManagementsModel.isActive= 0;
      Swal.fire(
        'Acudiente deshabilitado!',
        '',
        'warning'
       )
    }
    this.attendingManagementsService.deshabilitar(this.attendingManagementsModel,data.id)
    .subscribe(res=>{
    this.listAttendingManagementss()
    })

  }


  activar(data:any){
    this.attendingManagementsModel.isActive = data.isActive
     if (data.isActive==0) {
       this.attendingManagementsModel.isActive= 1;
       Swal.fire(
         'Acudiente habilitado!',
         '',
         'success'
        )
     }
 
     this.attendingManagementsService.deshabilitar(this.attendingManagementsModel,data.id)
     .subscribe(res=>{
     this.listAttendingManagementss()
     })

   }

  restablecerContrasena(data:any){
      this.loginService.recuperarContrasena(data.correoElectronico).subscribe(
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
