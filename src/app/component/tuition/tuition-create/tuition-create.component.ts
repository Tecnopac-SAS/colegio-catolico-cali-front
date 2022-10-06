import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Tuition } from 'src/app/models/tuition.model';
import { TuitionExtra } from 'src/app/models/tuition.model';
import { TuitionService } from 'src/app/services/tuition.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tuition-create',
  templateUrl: './tuition-create.component.html',
  styleUrls: ['./tuition-create.component.css']
})
export class TuitionCreateComponent implements OnInit {
  grade !: any;
  navTitle="crear matricula"
  public dataTuition:any
  formValue!: FormGroup;
  formValueExtra!: FormGroup;
  tuitionModel:Tuition= new Tuition();
  tuitionExtraModel:TuitionExtra= new TuitionExtra();
  public mensaje_ok:any;
  public mensaje_error:any;
  constructor(
    private formBuilder:FormBuilder,
    private tuitionService:TuitionService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.gradeList()
    this.fieldCapture()
  }

  fieldCapture(){
    this.formValue = this.formBuilder.group({
      isActive:[''],
      description: [''],
      price: [''],
      startDate: [''],
      finalDate: [''],
      surcharge: [''],
      idGrade: [''],
    })
  }

  CrearMatricula(){
    this.tuitionModel.isActive = this.formValue.value.isActive;
    this.tuitionModel.price = this.formValue.value.price;
    this.tuitionModel.startDate = this.formValue.value.startDate;
    this.tuitionModel.finalDate = this.formValue.value.finalDate;
    this.tuitionModel.idGrade = this.formValue.value.idGrade;

    if(this.tuitionModel.idGrade ==0 ){
      this.mensaje_error="El campo grado no puede estar vacio"
    }

    else if(this.tuitionModel.price <=0 ){
      this.mensaje_error="El campo precio no puede estar vacio"
    }

    else if(this.tuitionModel.startDate==""){
      this.mensaje_error="El campo Fecha de inicio no puede estar vacio"
    }

    else if(this.tuitionModel.finalDate==""){
      this.mensaje_error="El campo Fecha final no puede estar vacio"
    }
    else{
      this.tuitionModel.description = "Ordinaria";
      this.tuitionModel.surcharge = 0;
      this.tuitionService.createTuition(this.tuitionModel)
      .subscribe(res=>{
      console.log(res);
        if (res.mensaje=="La matricula ya existe") {
          this.mensaje_error=res.mensaje;
        }
        else{
          this.mensaje_ok="Se registro correctamente"
          this.formValue = this.formBuilder.group({
            isActive:[''],
            description: [''],
            price: [''],
            startDate: [''],
            finalDate: [''],
            surcharge: [''],
            idGrade: [''],
          })
        }
      },
      err=>{
        console.log(err)
      })
    }
  }

  gradeList(){
    this.tuitionService.listGrades()
    .subscribe(res=>{
      this.grade=res.result
      console.log(this.grade)
    })

  }
  cerrarAlerta(){
    this.mensaje_error=""
  }

}
