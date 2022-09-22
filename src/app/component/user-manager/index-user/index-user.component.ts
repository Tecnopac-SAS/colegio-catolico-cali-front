import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.models';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import Swal from'sweetalert2';

@Component({
  selector: 'app-index-user',
  templateUrl: './index-user.component.html',
  styleUrls: ['./index-user.component.css']
})
export class IndexUserComponent implements OnInit {

  formValue !:FormGroup
  public navTitle:any
  public dataUsers:any

  userModel:User = new User();

  constructor(
    private formBuilder:FormBuilder,
    private userService:UserService,
    private router:Router) { }

  ngOnInit(): void {
    this.listUsers();
    this.getFields();
    this.navTitle="Estoy en listar"
  }

  listUsers(){
    this.userService.listUsers()
    .subscribe(res=>{
      this.dataUsers=res.result
      console.log(this.dataUsers)
    })
  }

  getFields(){
    this.formValue= this.formBuilder.group({
      name:[''],
      email:[''],
      password:[''],
      role:[''],
      isActive:[''],
    })
  }

  editUser(user:any){

    this.formValue.controls['name'].setValue(user.name)
    this.formValue.controls['email'].setValue(user.email)
    this.formValue.controls['password'].setValue(user.password)
    this.formValue.controls['role'].setValue(user.idRole)
    this.formValue.controls['isActive'].setValue(user.isActive)

    this.userModel.id = user.id
  }

  updateUser(){

    this.userModel.name= this.formValue.value.name;
    this.userModel.email= this.formValue.value.email;
    this.userModel.password= this.formValue.value.password;
    this.userModel.idRole= this.formValue.value.idRole;
    this.userModel.isActive= this.formValue.value.isActive;

    this.userService.updateUser(this.userModel.id,this.userModel)
    .subscribe(res=>{

      Swal.fire(
        'Usuario actualizado!',
        '',
        'success'
       )
      this.listUsers()
    })


  }

}
