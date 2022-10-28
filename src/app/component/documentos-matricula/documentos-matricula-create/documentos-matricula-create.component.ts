import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { DocumentosMatricula } from 'src/app/models/documentos-matricula.model';
import { DocumentosMatriculaService } from 'src/app/services/documentos-matricula.service';

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
  formValue!: FormGroup;
  formValueExtra!: FormGroup;
  documentosMatriculaModel:DocumentosMatricula= new DocumentosMatricula();
  public mensaje_ok:any;
  public mensaje_error:any;
  constructor(
    private formBuilder:FormBuilder,
    private DocumentosMatriculaService:DocumentosMatriculaService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.fieldCapture()

  }

  fieldCapture(){
    this.formValue = this.formBuilder.group({
      name: [''],
      apply: [''],
      grade:[''],
      file:[''],
      isActive:['']
    })
  }

  CrearDocumentosMatricula(){
    this.documentosMatriculaModel.name = this.formValue.value.name;
    this.documentosMatriculaModel.apply = this.formValue.value.apply;
    this.documentosMatriculaModel.grade = this.formValue.value.grade;
    this.documentosMatriculaModel.file = this.formValue.value.file;
    this.documentosMatriculaModel.isActive = this.formValue.value.isActive;

    if(this.documentosMatriculaModel.name =="" ){
      this.mensaje_error="El campo nombre no puede estar vacio"
    }

    else if(this.documentosMatriculaModel.apply  == "" ){
      this.mensaje_error="El campo a quien aplica no puede estar vacio"
    }

    else if(this.documentosMatriculaModel.grade  == "" ){
      this.mensaje_error="El campo grado no puede estar vacio"
    }

    else if(this.documentosMatriculaModel.file  == "" ){
      this.mensaje_error="El campo fila no puede estar vacio"
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
          name: [''],
          apply: [''],
          grade:[''],
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
