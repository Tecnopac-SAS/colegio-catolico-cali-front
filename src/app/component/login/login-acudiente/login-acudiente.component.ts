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
 public bolsillo: any;
 public idAcudiente: any;
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
   this.loginService.login(this.formValue.value,'2').subscribe(
     response=>{
      if (response.token) {
        this.token=response.token
        this.nombre=response.nombres
        this.role=response.idRole
        this.id=response.id
        this.bolsillo=response.bolsillo
        this.idAcudiente=response.idAcudiente
        localStorage.setItem('token',this.token);
        localStorage.setItem('usuario',this.nombre);
        localStorage.setItem('idRole',this.role);
        localStorage.setItem('id',this.id);
        localStorage.setItem('bolsillo',this.bolsillo);
        localStorage.setItem('idAcudiente',this.idAcudiente);
        this.router.navigate(['home'])
      }else{
        Swal.fire(
          'Correo o contraseña incorrectas',
          '',
          'error'
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
