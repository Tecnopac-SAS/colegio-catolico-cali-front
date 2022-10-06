import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Tuition } from 'src/app/models/tuition.model';
import { TuitionExtra } from 'src/app/models/tuition.model';
import { TuitionService } from 'src/app/services/tuition.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tuitio-extra-create',
  templateUrl: './tuitio-extra-create.component.html',
  styleUrls: ['./tuitio-extra-create.component.css']
})
export class TuitioExtraCreateComponent implements OnInit {

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
    this.fieldCaptureExtra()

  }

  fieldCaptureExtra(){
    this.formValueExtra = this.formBuilder.group({
      isActiveExt:[''],
      descriptionExt: [''],
      priceExt: [''],
      startDateExt: [''],
      finalDateExt: [''],
      surchargeExt: [''],
      idGradeExt: [''],
    })
  }

  CrearMatriculaExtra(){
    this.tuitionExtraModel.isActive = this.formValueExtra.value.isActiveExt;
    this.tuitionExtraModel.price = this.formValueExtra.value.priceExt;
    this.tuitionExtraModel.startDate = this.formValueExtra.value.startDateExt;
    this.tuitionExtraModel.finalDate = this.formValueExtra.value.finalDateExt;
    this.tuitionExtraModel.idGrade = this.formValueExtra.value.idGradeExt;

    if(this.tuitionExtraModel.idGrade ==0 ){
      this.mensaje_error="El campo grado no puede estar vacio"
    }

    else if(this.tuitionExtraModel.price  <=0 ){
      this.mensaje_error="El campo precio no puede estar vacio"
    }

    else if(this.tuitionExtraModel.startDate==""){
      this.mensaje_error="El campo Fecha de inicio no puede estar vacio"
    }

    else if(this.tuitionExtraModel.finalDate==""){
      this.mensaje_error="El campo Fecha final no puede estar vacio"
    }
    else{
      this.tuitionExtraModel.description = "ExtraOrdinaria";
      this.tuitionExtraModel.surcharge = 0;
      this.tuitionService.createTuition(this.tuitionExtraModel)
      .subscribe(res=>{
      console.log(res);
        if (res.mensaje=="La matricula ya existe") {
          this.mensaje_error=res.mensaje;
        }
        else{
          this.mensaje_ok="Se registro correctamente"
          this.formValueExtra = this.formBuilder.group({
            isActiveExt:[''],
            descriptionExt: [''],
            priceExt: [''],
            startDateExt: [''],
            finalDateExt: [''],
            surchargeExt: [''],
            idGradeExt: [''],
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
