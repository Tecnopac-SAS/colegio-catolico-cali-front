import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajustes-perfil-pass',
  templateUrl: './ajustes-perfil-pass.component.html',
  styleUrls: ['./ajustes-perfil-pass.component.css']
})
export class AjustesPerfilPassComponent implements OnInit {
public passActual: string
public newPass: string
public newPassConfirm: string
  showPassword: any;
  constructor(private userService:UserService) {
    this.passActual = ''
    this.newPass = ''
    this.newPassConfirm = ''    
  }

  ngOnInit(): void {
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  sendPass(){
    if (this.passActual == '' || this.newPass == '' || this.newPassConfirm == '') {
      Swal.fire({
        icon: 'error',
        title: 'Todos los campos son obligatorios',
      })
      return
    }
    if (this.newPass != this.newPassConfirm) {
      Swal.fire({
        icon: 'error',
        title: 'Las contraseñas no coinciden',
      })
      return
    }else{
      this.userService.updatePasswordConfirm(localStorage.getItem('id'), {newPass:this.newPass,passActual:this.passActual}).subscribe( (res:any) => {
        Swal.fire({
          icon: (res.status == 200)?'success':'error',
          title: res.mensaje,
        })
        if (res.status == 200) {
          this.passActual = ''
          this.newPass = ''
          this.newPassConfirm = ''
        }
      })
    }
  }

}
