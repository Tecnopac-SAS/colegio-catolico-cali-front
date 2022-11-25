import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { SchoolYear } from 'src/app/models/schoolYear.model';
import { SchoolYearService } from 'src/app/services/school-year.service';
import { User } from 'src/app/models/user.models';
import { Inscription } from 'src/app/models/inscription.model';
import { InscriptionService } from 'src/app/services/inscription.service';
import Swal from'sweetalert2';
import Data from 'src/assets/json/base-estudiantes.json';

@Component({
  selector: 'app-student-database-index',
  templateUrl: './student-database-index.component.html',
  styleUrls: ['./student-database-index.component.css']
})
export class StudentDatabaseIndexComponent implements OnInit {

  data: any = Data;
  public navTitle:any
  public name: any;
  public idStorage: any;
  formValue !: FormGroup;
  formValuePrecio !: FormGroup;
  schoolYearModel:SchoolYear = new SchoolYear();
  inscriptionModel:Inscription = new Inscription();
  userModel:User = new User();
  constructor(private userService:UserService,private schoolYearService:SchoolYearService,private inscriptionService:InscriptionService,private formBuilder:FormBuilder,) 
  {
   this.name= this.userService.getName();
   this.idStorage= this.userService.getId(); 
  }

  ngOnInit(): void {
    this.navTitle="Estoy en inicio"
    this.fieldCapture()
    this.fieldCapturePrecio()
  }
  fieldCapture(){
    this.formValue= this.formBuilder.group({
      id:this.idStorage,
      password:[''],
    })
  }

  fieldCapturePrecio(){
    this.formValuePrecio= this.formBuilder.group({
      price:['']
    })
  }
  
  actualizarSchoolYear(){
    if(this.formValue.value.password==""){
      Swal.fire(
        'Ingrese su contraseña!',
        '',
        'warning'
       )
    }
    // else{
    //   this.userModel.password =  this.formValue.value.password
    //   this.schoolYearService.cambioAnioLectivo(this.userModel,this.id)
    //   .subscribe(res=>{
    //     if(res.mensaje=="Los campos no pueden estar vacios"){
    //       Swal.fire(
    //         'El correo no existe!',
    //         '',
    //         'error'
    //        )
    //     }
    //     Swal.fire(
    //       'Año lectivo actualizado!',
    //       '',
    //       'success'
    //      )
      
    //       console.log(res)
    //   })
    // }
    else{
      this.schoolYearService.cambioAnioLectivo(this.formValue.value).subscribe(
        response=>{
          if(response.mensaje=="Los campos no pueden estar vacios"){
            Swal.fire(
              '¡Algunos campos estan vacios!',
              '',
              'error'
             )
          }
          else if(response.mensaje=="Contraseña incorrecta"){
            Swal.fire(
              'Contraseña incorrecta!',
              '',
              'error'
             )
          }
          else{
            Swal.fire(
              '¡Cambio de periodo exitoso!',
              '',
              'success'
             )
          }
        },
        error=>{
          console.log("estoy en error ultimo")
          console.log(error)
          
        }
      )
      this.formValue= this.formBuilder.group({
        id:this.idStorage,
        password:['']
      })
    }
  }

  actualizarPrecio(){
    this.inscriptionModel.price = this.formValuePrecio.value.price
     if (this.inscriptionModel.price==0) {
       Swal.fire(
         '¡El campo precio no puede estar vacio!',
         '',
         'error'
        )
     }
     else {
     this.inscriptionService.actualizarPrecio(this.inscriptionModel)
     .subscribe(res=>{
      
     })
    }
    this.formValuePrecio= this.formBuilder.group({
      price:['']
    })
   }

}
