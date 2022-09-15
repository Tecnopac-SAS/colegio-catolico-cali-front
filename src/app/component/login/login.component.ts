import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user.models';
import { LoginService } from 'src/app/services/login.service';
import Swal from'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
  ) { }

  ngOnInit(): void {
    this.fieldCapture();
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
        'Ingre su correo!',
        'You clicked the button!',
        'warning'
       )
      //  setTimeout(() => {
      //     this.router.navigate(['producto-index']);
      //   }, 2000);
    }

    else if(this.formValue.value.password==""){
      Swal.fire(
        'Ingre su contraseña!',
        'You clicked the button!',
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
              'You clicked the button!',
              'error'
             )
          }
          else if(response.mensaje=="Contraseña incorrecta"){
            Swal.fire(
              'Contraseña incorrecta!',
              'You clicked the button!',
              'error'
             )
          }
          else{
            Swal.fire(
              'Inicio de sesión correcto!',
              'You clicked the button!',
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
                this.router.navigate(['dashboard'])
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

}
