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

  public filter:any;
  public filterText:any;
  formValue !:FormGroup
  public navTitle:any
  public dataUsers:any
  role !: any;
  isActive !: any;
  userModel:User = new User();

  constructor(
    private formBuilder:FormBuilder,
    private userService:UserService,
    private router:Router) { }

  ngOnInit(): void {
    this.listUsers();
    this.getFields();
    this.navTitle="Administración de usuarios"
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
    this.roleList();
    this.userModel.id = user.id
    this.formValue.controls['name'].setValue(user.name)
    this.formValue.controls['email'].setValue(user.email)
    this.formValue.controls['role'].setValue(user.idRole)

    if (user.isActive==0) {
      this.formValue.controls['isActive'].setValue(0)

    } else {
      this.formValue.controls['isActive'].setValue(1)
    }

  }

  search(searchForm:any){

    if(this.filterText==""){
      this.listUsers();
    }

    else {
      // this.coursesService.listCourse(searchForm.value.filtro)
      // .subscribe(res=>{
      //   this.dataCourse=res.result
      //   console.log(res.result)
      // })
    }

  }


  updateUser(){

    this.userModel.name= this.formValue.value.name;
    this.userModel.email= this.formValue.value.email;
    this.userModel.password= this.formValue.value.password;
    this.userModel.idRole= this.formValue.value.idRole;
    this.userModel.isActive= this.formValue.value.isActive;

    if (this.userModel.password=="") {

      Swal.fire(
        'El campo contraseña no puede estar vacio!',
        '',
        'warning'
       )
    }

    else if (this.userModel.isActive==2) {

      Swal.fire(
        'El campo estado no puede estar vacio!',
        '',
        'warning'
       )
    }

    else {
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

    this.formValue= this.formBuilder.group({
      name:[''],
      email:[''],
      password:[''],
      role:[''],
      isActive:[''],
    })

  }

  roleList(){
    this.userService.getRoles()
    .subscribe(res=>{
      this.role=res.result
      console.log(this.role)
    })

  }

}
