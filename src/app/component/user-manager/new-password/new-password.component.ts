import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { User } from 'src/app/models/user.models';
import { UserService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from'sweetalert2';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

//son variables auxiliares
public user: any;
public token: any;
public id:any;
public mensaje_ok:any;
public mensaje_error:any;
userModel:User= new User();
formValue !: FormGroup;

constructor(
private formBuilder:FormBuilder,
private userService:UserService,
private loginService:LoginService,
private router:Router,
private route : ActivatedRoute,
) {
this.token= this.loginService.getToken();
}

ngOnInit(): void {
this.fieldCapture();
}

fieldCapture(){
this.formValue= this.formBuilder.group({
  password:[''],
  passwordVerified:[''],
})
this.fieldCaptureIndex()
}

fieldCaptureIndex(){
  this.route.params.subscribe(params=>{
    this.id = params['id'];
    this.userService.obtenerUsuario(this.id).subscribe(
      response=>{
        console.log(response)
        if (response.result=="No hay datos" || response.result.length==0) {
          this.router.navigate([''])
        }
    
      else {
        this.user= response.result
        console.log(this.user)
        this.userModel.id = this.user.id
        if (!this.user) {
          this.router.navigate([''])
        }
        if (this.user.isActive) {
        }

        if (this.user.isActive==false) {
          this.router.navigate([''])
        }
        
      }
      } 
    )

  })

}

actualizarPassword(){
  console.log(this.formValue.value)
  this.userModel.password= this.formValue.value.password;
  console.log(this.userModel)

  if(this.formValue.value.password =="" ){
    Swal.fire(
      'El campo contraseña no puede estar vacio!',
      '',
      'warning'
     )
  }

  else if(this.formValue.value.passwordVerified =="" ){
    Swal.fire(
      'El campo de repetir contraseña no puede estar vacio!',
      '',
      'warning'
     )
  }

  else if(this.formValue.value.password !== this.formValue.value.passwordVerified ){
    Swal.fire(
      'No coinciden las contraseña!',
      '',
      'error'
     )
  }

  else {
  this.userService.updatePassword(this.id,this.userModel)
  .subscribe(res=>{

    Swal.fire(
      'contraseña actualizada!',
      '',
      'success'
     )
     setTimeout(() => {
        this.router.navigate(['certificate']);
      }, 2000);
  })
 }
}




}
