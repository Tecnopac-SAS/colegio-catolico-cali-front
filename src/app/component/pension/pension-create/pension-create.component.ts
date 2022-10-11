import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Pension } from 'src/app/models/pension.model';
import { PensionService } from 'src/app/services/pension.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-pension-create',
  templateUrl: './pension-create.component.html',
  styleUrls: ['./pension-create.component.css']
})
export class PensionCreateComponent implements OnInit {

  grade !: any;
  navTitle="crear pension"
  public dataPension:any
  formValue!: FormGroup;
  formValueExtra!: FormGroup;
  pensionModel:Pension= new Pension();
  public mensaje_ok:any;
  public mensaje_error:any;
  constructor(
    private formBuilder:FormBuilder,
    private pensionService:PensionService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.gradeList()
    this.fieldCaptureExtra()

  }

  fieldCaptureExtra(){
    this.formValueExtra = this.formBuilder.group({
      price:[''],
      discount: [''],
      isActive: [''],
      idGrade: [''],
    })
  }

  CrearMatriculaExtra(){
    this.pensionModel.isActive = this.formValueExtra.value.isActive;
    this.pensionModel.price = this.formValueExtra.value.price;
    this.pensionModel.discount = this.formValueExtra.value.discount;
    this.pensionModel.idGrade = this.formValueExtra.value.idGrade;


    if(this.pensionModel.idGrade ==0 ){
      this.mensaje_error="El campo grado no puede estar vacio"
    }

    else if(this.pensionModel.price  <=0 ){
      this.mensaje_error="El campo precio no puede estar vacio"
    }

    else if(this.pensionModel.discount==0){
      this.mensaje_error="El campo descuento no puede estar vacio"
    }


    else{

      this.pensionService.createPension(this.pensionModel)
      .subscribe(res=>{
      console.log(res);
        if (res.mensaje=="La pensión ya existe") {
          this.mensaje_error=res.mensaje;
        }
        else{
          this.mensaje_ok="Se registro correctamente"
          this.formValueExtra = this.formBuilder.group({
            price:[''],
            discount: [''],
            isActive: [''],
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
    this.pensionService.listGrades()
    .subscribe(res=>{
      this.grade=res.result
      console.log(this.grade)
    })

  }
  cerrarAlerta(){
    this.mensaje_error=""
  }

}
