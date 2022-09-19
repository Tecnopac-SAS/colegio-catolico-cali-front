import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user.models';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

   //Variables auxiliares

 formValue!: FormGroup;
 userModel:User= new User();
 role !: any;
 public mensaje_ok:any;
 public mensaje_error:any;

  constructor(
    private formBuilder:FormBuilder,
    private userService:UserService,
    private router:Router
  ) { }

  fieldCapture(){
    this.formValue = this.formBuilder.group({
      name:[''],
      email: [''],
      role: [''],
      password: [''],
    })
  }

  ngOnInit(): void {
    this.fieldCapture()
    this.roleList()
  }

  CrearUsuario(){
    this.userModel.name = this.formValue.value.name;
    this.userModel.email = this.formValue.value.email;
    this.userModel.idRole = this.formValue.value.role;
    this.userModel.password = this.formValue.value.password;

    if(this.userModel.name==""){
      this.mensaje_error="El campo nombre no puede estar vacio"
    }

    else if(this.userModel.email==""){
      this.mensaje_error="El campo correo no puede estar vacio"
    }

    else if(this.userModel.idRole==0){
      this.mensaje_error="Debe seleccionar un rol"
    }

    else if(this.userModel.password==""){
      this.mensaje_error="Digite la contraseña"
    }

    else{
      //Cuando salta acá ya esta alimentada la información
      this.userService.createUser(this.userModel)
      .subscribe(res=>{
      console.log(res);
        if (res.mensaje=="El usuario ya existe") {
          this.mensaje_error=res.mensaje;
        }
        else{
          this.mensaje_ok="Se registro correctamente"
          this.formValue = this.formBuilder.group({
            name:[''],
            email: [''],
            role: [''],
            password: [''],
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

  roleList(){
    this.userService.getRoles()
    .subscribe(res=>{
      this.role=res.result
      console.log(this.role)
    })

  }

}
