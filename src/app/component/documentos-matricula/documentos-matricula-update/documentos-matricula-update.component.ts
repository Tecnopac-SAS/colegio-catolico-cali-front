import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { DocumentosMatricula } from 'src/app/models/documentos-matricula.model';
import { DocumentosMatriculaService } from 'src/app/services/documentos-matricula.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from'sweetalert2'
import { PensionService } from 'src/app/services/pension.service';

@Component({
  selector: 'app-documentos-matricula-update',
  templateUrl: './documentos-matricula-update.component.html',
  styleUrls: ['./documentos-matricula-update.component.css']
})
export class DocumentosMatriculaUpdateComponent implements OnInit {
  @ViewChild("fileInput") fileInput:any;
  DocumentosMatricula !: any;
  navTitle="documentos matricula editar"
  public dataDocumentosMatricula:any
  public listGrades:any

  formValue!: FormGroup;
  formValueExtra!: FormGroup;
  documentosMatriculaModel:DocumentosMatricula= new DocumentosMatricula();
  public mensaje_ok:any;
  public mensaje_error:any;
  id !: any;
  constructor(
    private formBuilder:FormBuilder,
    private DocumentosMatriculaService:DocumentosMatriculaService,
    private router:Router,
    private route : ActivatedRoute,
    private pensionService:PensionService,
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
    this.fieldCaptureIndex()
  }

  fieldCaptureIndex(){
    this.route.params.subscribe(params=>{
      this.id = params['id'];
      this.DocumentosMatriculaService.obtenerDocumentosMatricula(this.id).subscribe(
        response=>{
          this.DocumentosMatricula= response
          console.log(this.DocumentosMatricula)
          this.formValue.controls['title'].setValue(this.DocumentosMatricula.result.title)
          this.formValue.controls['canViewType'].setValue(this.DocumentosMatricula.result.canViewType)
          this.formValue.controls['canViewValue'].setValue(this.DocumentosMatricula.result.canViewValue)
          this.formValue.controls['file'].setValue(this.DocumentosMatricula.result.file)
          this.formValue.controls['isActive'].setValue(this.DocumentosMatricula.result.isActive)
          this.documentosMatriculaModel.id = this.DocumentosMatricula.result.id
        }
      )
    })
  }

  actualizarDocumentosMatricula(){
    console.log(this.formValue.value)
    this.documentosMatriculaModel.title= this.formValue.value.title;
    this.documentosMatriculaModel.canViewType= this.formValue.value.canViewType;
    this.documentosMatriculaModel.canViewValue= this.formValue.value.canViewValue;
    this.documentosMatriculaModel.file= this.formValue.value.file;
    this.documentosMatriculaModel.isActive= this.formValue.value.isActive;
    console.log(this.documentosMatriculaModel)

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
    }else if(this.formValue.value.file  == "" ){
      this.mensaje_error="Debes tener al menos un documento"
    }else{
      const formData = new FormData();
      formData.append('title',this.formValue.value.title)
      formData.append('canViewType',this.formValue.value.canViewType)
      formData.append('canViewValue',this.formValue.value.canViewValue)
      formData.append('file',this.fileInput.nativeElement.files[0])
    this.DocumentosMatriculaService.updateDocumentosMatricula(formData,this.id)
    .subscribe(res=>{
      
      Swal.fire(
        res.mensaje,
        '',
        (res.success)?'success':'error'
       )
       if (res.success) {
         setTimeout(() => {
            this.router.navigate(['documentos-matricula']);
          }, 2000);
       }
    })
   }
  }



  cerrarAlerta(){
    this.mensaje_error=""
  }

}
