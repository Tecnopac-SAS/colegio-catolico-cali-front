import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from'sweetalert2';

@Component({
  selector: 'app-login-acudiente',
  templateUrl: './login-acudiente.component.html',
  styleUrls: ['./login-acudiente.component.css']
})
export class LoginAcudienteComponent implements OnInit {

 //son variables auxiliares
 public user: any;
 public token: any;
 public id:any;
 public nombre: any;
 public role: any;
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
 this.fieldCapture();
 this.sessionValidation();
}

fieldCapture(){
 this.formValue= this.formBuilder.group({
   email:[''],
   password:['']
 })
}

login(){
 if(this.formValue.value.email==""){
   Swal.fire(
     'Ingrese su correo!',
     '',
     'warning'
    )
 }

 else if(this.formValue.value.password==""){
   Swal.fire(
     'Ingrese su contraseña!',
     '',
     'warning'
    )
 }
 else{
   this.loginService.login(this.formValue.value).subscribe(
     response=>{
       console.log(response)
       if(response.mensaje=="correo invalido"){
         Swal.fire(
           'El correo no existe!',
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
           'Inicio de sesión correcto!',
           '',
           'success'
          )
             //estas variables auxiliares contiene los datos de la bd
             this.token=response.token
             this.nombre=response.nombres
             this.role=response.idRole
             this.id=response.id
             localStorage.setItem('token',this.token);
             localStorage.setItem('usuario',this.nombre);
             localStorage.setItem('idRole',this.role);
             localStorage.setItem('id',this.id);
         this.loginService.login(this.formValue.value).subscribe(
           response=>{
             console.log(response)
             this.router.navigate(['home'])
           },
           error=>{
             console.log(error)
             alert(error)
           }
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
   this.router.navigate([''])
 }
}

}
