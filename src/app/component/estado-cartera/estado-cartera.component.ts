
import { Component, OnInit } from '@angular/core';
import { AttendingManagements } from 'src/app/models/attendingManagements.model';
import { AttendingManagementsService } from 'src/app/services/attending-managements.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import Swal from'sweetalert2';

@Component({
  selector: 'app-estado-cartera',
  templateUrl: './estado-cartera.component.html',
  styleUrls: ['./estado-cartera.component.css']
})
export class EstadoCarteraComponent implements OnInit {

  grade !: any;
  navTitle="Estado de Cartera"
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
    this.listAttendingManagements()
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

  listAttendingManagements(){
    this.attendingManagementsService.listAttendingManagements()
    .subscribe(res=>{
      this.dataAttendingManagements=res.result
      console.log(this.dataAttendingManagements)
    })
  }

  search(searchForm:any){

    if(this.filterText==""){
      this.listAttendingManagements();
    }
    else {
      this.attendingManagementsService.listAttendingManagement(searchForm.value.filtro)
      .subscribe(res=>{
        this.dataAttendingManagements=res.result
        console.log(res.result)
      })
    }

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
    this.listAttendingManagements()
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
     this.listAttendingManagements()
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
