import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Period } from 'src/app/models/period.model';
import { PeriodService } from 'src/app/services/period.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-period-create',
  templateUrl: './period-create.component.html',
  styleUrls: ['./period-create.component.css']
})
export class PeriodCreateComponent implements OnInit {
 navTitle="Periodo crear"
 formValue!: FormGroup;
 periodModel:Period= new Period();
 public mensaje_ok:any;
 public mensaje_error:any;
 role !: any;
  constructor(
    private formBuilder:FormBuilder,
    private periodService:PeriodService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.fieldCapture()
  }

  fieldCapture(){
    this.formValue = this.formBuilder.group({
      age:[''],
      password: [''],
      identifier: [''],
      consecutive: [''],
    })
  }

  CrearPeriodo(){
    this.periodModel.age = this.formValue.value.age;
    this.periodModel.password = this.formValue.value.password;
    this.periodModel.identifier = this.formValue.value.identifier;
    this.periodModel.consecutive = this.formValue.value.consecutive;

    if(this.periodModel.age==""){
      this.mensaje_error="El campo nombre no puede estar vacio"
    }

    else if(this.periodModel.password==""){
      this.mensaje_error="El campo correo no puede estar vacio"
    }

    else if(this.periodModel.consecutive==0){
      this.mensaje_error="Debe seleccionar un rol"
    }

    else if(this.periodModel.password==""){
      this.mensaje_error="Digite la contraseña"
    }

    else{
      //Cuando salta acá ya esta alimentada la información
      this.periodService.createPeriod(this.periodModel)
      .subscribe(res=>{
      console.log(res);
        if (res.mensaje=="El usuario ya existe") {
          this.mensaje_error=res.mensaje;
        }
        else{
          this.mensaje_ok="Se registro correctamente"
          this.formValue = this.formBuilder.group({
            age:[''],
            password: [''],
            identifier: [''],
            consecutive: [''],
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

  /*roleList(){
    this.periodService.getRoles()
    .subscribe(res=>{
      this.role=res.result
      console.log(this.role)
    })

  }*/

}
