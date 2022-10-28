import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Technical } from 'src/app/models/technical.model';
import { TechnicalService } from 'src/app/services/technical.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-technical-create',
  templateUrl: './technical-create.component.html',
  styleUrls: ['./technical-create.component.css']
})
export class TechnicalCreateComponent implements OnInit {

  Technical !: any;
  navTitle="medias tecnicas crear"
  public dataTransporte:any
  formValue!: FormGroup;
  formValueExtra!: FormGroup;
  technicalModel:Technical= new Technical();
  public mensaje_ok:any;
  public mensaje_error:any;
  constructor(
    private formBuilder:FormBuilder,
    private TechnicalService:TechnicalService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.fieldCapture()

  }

  fieldCapture(){
    this.formValue = this.formBuilder.group({
      course: [''],
      startDate: [''],
      finalDate:[''],
      price:[''],
      teacher:[''],
      isActive:['']
    })
  }

  CrearTechnical(){
    this.technicalModel.course = this.formValue.value.course;
    this.technicalModel.startDate = this.formValue.value.startDate;
    this.technicalModel.finalDate = this.formValue.value.finalDate;
    this.technicalModel.price = this.formValue.value.price;
    this.technicalModel.teacher = this.formValue.value.teacher;
    this.technicalModel.isActive = this.formValue.value.isActive;

    if(this.technicalModel.course =="" ){
      this.mensaje_error="El campo curso no puede estar vacio"
    }

    else if(this.technicalModel.startDate  == "" ){
      this.mensaje_error="El campo fecha de inicio no puede estar vacio"
    }

    else if(this.technicalModel.finalDate  == "" ){
      this.mensaje_error="El campo fecha final no puede estar vacio"
    }

    else if(this.technicalModel.price  == "" ){
      this.mensaje_error="El campo precio no puede estar vacio"
    }

    else if(this.technicalModel.teacher  == "" ){
      this.mensaje_error="El campo profesor no puede estar vacio"
    }


    else{
      this.TechnicalService.createTechnical(this.technicalModel)
      .subscribe(res=>{
      console.log(res);
        if (res.mensaje=="el dato ya existe") {
          this.mensaje_error=res.mensaje;
        }
        else{
          this.mensaje_ok="Se registro correctamente"
          this.formValue = this.formBuilder.group({
            course: [''],
            startDate: [''],
            finalDate:[''],
            price:[''],
            teacher:[''],
            isActive:['']
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

}
