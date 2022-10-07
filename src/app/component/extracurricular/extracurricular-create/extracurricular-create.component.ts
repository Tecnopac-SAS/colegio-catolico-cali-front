import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Extracurricular } from 'src/app/models/extracurricular.model';
import { ExtracurricularService } from 'src/app/services/extracurricular.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-extracurricular-create',
  templateUrl: './extracurricular-create.component.html',
  styleUrls: ['./extracurricular-create.component.css']
})
export class ExtracurricularCreateComponent implements OnInit {

  navTitle="crear Extracurricular"
  public dataExtracurricular:any
  formValue!: FormGroup;
  extracurricularModel:Extracurricular= new Extracurricular();
  public mensaje_ok:any;
  public mensaje_error:any;
  constructor(
    private formBuilder:FormBuilder,
    private extracurricularService:ExtracurricularService,
    private router:Router
  ) { }

  ngOnInit(): void {

    this.fieldCapture()

  }

  fieldCapture(){
    this.formValue = this.formBuilder.group({
      imagen:[''],
      startDate: [''],
      finalDate: [''],
      teacher: [''],
      activity: [''],
      price: [''],
      information: [''],
      schedule: [''],
      isActive: [''],
    })
  }



  CrearExtracurricular(){
    this.extracurricularModel.imagen = this.formValue.value.imagen;
    this.extracurricularModel.startDate = this.formValue.value.startDate;
    this.extracurricularModel.finalDate = this.formValue.value.finalDate;
    this.extracurricularModel.teacher = this.formValue.value.teacher;
    this.extracurricularModel.activity = this.formValue.value.activity;
    this.extracurricularModel.price = this.formValue.value.price;
    this.extracurricularModel.information = this.formValue.value.information;
    this.extracurricularModel.schedule = this.formValue.value.schedule;
    this.extracurricularModel.isActive = this.formValue.value.isActive;

    if(this.extracurricularModel.startDate =="" ){
      this.mensaje_error="El campo Fecha de inicio no puede estar vacio"
    }

    else if(this.extracurricularModel.imagen  =="" ){
      this.mensaje_error="El campo imagen no puede estar vacio"
    }

    else if(this.extracurricularModel.activity==""){
      this.mensaje_error="El campo actividad no puede estar vacio"
    }

    else if(this.extracurricularModel.finalDate==""){
      this.mensaje_error="El campo Fecha final no puede estar vacio"
    }

    else if(this.extracurricularModel.price==0){
      this.mensaje_error="El campo precio  no puede estar vacio"
    }

    else if(this.extracurricularModel.teacher==""){
      this.mensaje_error="El campo docente  no puede estar vacio"
    }
    else if(this.extracurricularModel.schedule==""){
      this.mensaje_error="El campo horario  no puede estar vacio"
    }
    else if(this.extracurricularModel.information==""){
      this.mensaje_error="El campo información  no puede estar vacio"
    }

    else{
      this.extracurricularService.createExtracurricular(this.extracurricularModel)
      .subscribe(res=>{
      console.log(res);

          this.mensaje_ok="Se registro correctamente"
          this.formValue = this.formBuilder.group({
            imagen:[''],
            startDate: [''],
            finalDate: [''],
            teacher: [''],
            activity: [''],
            price: [''],
            information: [''],
            schedule: [''],
            isActive: [''],

          })

      },
      err=>{
        console.log(err)
      })
    }
  }

  cerrarAlerta(){
    this.mensaje_error=""
  }

}
