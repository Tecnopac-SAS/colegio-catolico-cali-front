import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.models';
import { LoginService } from 'src/app/services/login.service';

import Swal from'sweetalert2';
@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.css']
})
export class RecoveryPasswordComponent implements OnInit {

  //son variables auxiliares
  public user: any;
  public token: any;
  public id:any;
  public nombre: any;
  public role: any;
  public captcha: any;
  public mensaje_ok:any;
  public mensaje_error:any;

  formValue !: FormGroup;

constructor(
  private formBuilder:FormBuilder,
  private loginService:LoginService,
  private router:Router
) {
  this.token= this.loginService.getToken();
 }

ngOnInit(): void {
  this.generarCap();
  this.fieldCapture();
  this.sessionValidation();

}

generarCap(){
  this.loginService.generarCaptcha()
  .subscribe(res=>{
    this.captcha=res.result
    console.log(this.captcha)
  })
}

fieldCapture(){
  this.formValue= this.formBuilder.group({
    email:[''],
    captcha:[''],
    code:['']
  })
}

restablecerContrasena(){
  if(this.formValue.value.email==""){
    Swal.fire(
      'Ingrese su correo!',
      '',
      'warning'
     )
  }

  else if(this.formValue.value.code==""){
    Swal.fire(
      'Ingrese su el captcha!',
      '',
      'warning'
     )
  }

  else if(this.captcha !== this.formValue.value.code){
    Swal.fire(
      'No coincide el código!',
      '',
      'warning'
     )
     console.log("cap " + this.captcha)
     console.log("code " + this.formValue.value.code)
     this.generarCap();
     this.formValue= this.formBuilder.group({

      code:['']
    })
  }

  else{
    this.loginService.recuperarContrasena(this.formValue.value.email).subscribe(
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
            'Se ha restablecido la contraseña!',
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

clearForm(e:any){

  if(e.target.checked)
  {

  }
  else{
    this.formValue= this.formBuilder.group({
      email:[''],
      password:['']
    })
  }

}

sessionValidation(){
  if(this.token){
    this.router.navigate(['home'])
  }
  else{
    this.router.navigate(['recuperar-contrasena'])
  }
}

}
