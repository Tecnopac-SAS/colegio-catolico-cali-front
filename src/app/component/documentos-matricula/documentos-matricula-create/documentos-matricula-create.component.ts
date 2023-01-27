import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { DocumentosMatricula } from 'src/app/models/documentos-matricula.model';
import { DocumentosMatriculaService } from 'src/app/services/documentos-matricula.service';
import { PensionService } from 'src/app/services/pension.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-documentos-matricula-create',
  templateUrl: './documentos-matricula-create.component.html',
  styleUrls: ['./documentos-matricula-create.component.css']
})
export class DocumentosMatriculaCreateComponent implements OnInit {

  DocumentosMatricula !: any;
  navTitle="Documentos matricula crear"
  public dataTransporte:any
  public listGrades:any
  formValue!: FormGroup;
  formValueExtra!: FormGroup;
  documentosMatriculaModel:DocumentosMatricula= new DocumentosMatricula();
  public mensaje_ok:any;
  public mensaje_error:any;
  constructor(
    private formBuilder:FormBuilder,
    private DocumentosMatriculaService:DocumentosMatriculaService,
    private pensionService:PensionService,
    private router:Router
  ) { 
    this.pensionService.listGrades().subscribe(response=>{
      this.listGrades = response.result
    },error=>{

    });
  }

  ngOnInit(): void {
    this.fieldCapture()

  }

  fieldCapture(){
    this.formValue = this.formBuilder.group({
      title: [''],
      canViewType: [''],
      canViewValue:[''],
      file:[''],
      isActive:['']
    })
  }

  CrearDocumentosMatricula(){
    this.documentosMatriculaModel.title = this.formValue.value.title;
    this.documentosMatriculaModel.canViewType = this.formValue.value.canViewType;
    this.documentosMatriculaModel.canViewValue = this.formValue.value.canViewValue;
    this.documentosMatriculaModel.file = this.formValue.value.file;
    this.documentosMatriculaModel.isActive = this.formValue.value.isActive;

    if(this.documentosMatriculaModel.title =="" ){
      this.mensaje_error="El campo nombre no puede estar vacio"
    }

    else if(this.documentosMatriculaModel.canViewType  == "" ){
      this.mensaje_error="El campo a quien aplica no puede estar vacio"
    }

    else if(this.documentosMatriculaModel.canViewValue  == "" && this.documentosMatriculaModel.canViewType == "grade" ){
      this.mensaje_error="El campo grado no puede estar vacio"
    }else if(this.documentosMatriculaModel.canViewValue == "" && this.documentosMatriculaModel.canViewType == "student"){
      this.mensaje_error="El codigo del estudiante no puede estar vacio"
    }else if(this.documentosMatriculaModel.file  == "" ){
      this.mensaje_error="Debes tener al menos un documento"
    }


    else{
      this.DocumentosMatriculaService.createDocumentosMatricula(this.documentosMatriculaModel)
      .subscribe(res=>{
      console.log(res);
        if (res.mensaje=="el dato ya existe") {
          this.mensaje_error=res.mensaje;
        }
        else{
          this.mensaje_ok="Se registro correctamente"
          this.formValue = this.formBuilder.group({
          title: [''],
          canViewType: [''],
          canViewValue:[''],
          file:[''],
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
