import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BolsilloService } from 'src/app/services/bolsillo.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bolsillo',
  templateUrl: './bolsillo.component.html',
  styleUrls: ['./bolsillo.component.css']
})
export class BolsilloComponent implements OnInit {
  navTitle="Bolsillo"
  public bolsillo: any
  formValue!: FormGroup 
  

  constructor(
    private formBuilder:FormBuilder,
    private userService:UserService,
    private bolsilloService:BolsilloService
    ) { 
    this.bolsillo = setInterval(()=>{this.checkBolsillo()},5000);
  }

  ngOnInit(): void {
    this.fieldCapture()
    this.bolsillo = localStorage.getItem('bolsillo')
  }
  fieldCapture(){
    this.formValue= this.formBuilder.group({
      cant:['']
    })
  }
  checkBolsillo(){
     this.bolsillo = localStorage.getItem('bolsillo')
 }
  recargarBolsillo(){
    this.bolsilloService.recarga(this.formValue.value,localStorage.getItem('idAcudiente')).subscribe(
      response=>{
        if (response.mensaje=='ok') {
          Swal.fire(
            'Bolsillo actualizado',
            '',
            'success'
          )
          this.formValue= this.formBuilder.group({
            cant:['']
          })
        }

      },
      error=>{
        console.log(error)
        alert(error)
      }
    )
    console.log(this.formValue.value)
  }
}
