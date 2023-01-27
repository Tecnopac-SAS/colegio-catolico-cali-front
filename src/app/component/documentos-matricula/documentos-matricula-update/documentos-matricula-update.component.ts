import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { DocumentosMatricula } from 'src/app/models/documentos-matricula.model';
import { DocumentosMatriculaService } from 'src/app/services/documentos-matricula.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from'sweetalert2'

@Component({
  selector: 'app-documentos-matricula-update',
  templateUrl: './documentos-matricula-update.component.html',
  styleUrls: ['./documentos-matricula-update.component.css']
})
export class DocumentosMatriculaUpdateComponent implements OnInit {

  DocumentosMatricula !: any;
  navTitle="documentos matricula editar"
  public dataDocumentosMatricula:any
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
  ) { }

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

    else if(this.documentosMatriculaModel.canViewValue  == "" ){
      this.mensaje_error="El campo grado no puede estar vacio"
    }

    else if(this.documentosMatriculaModel.file  == "" ){
      this.mensaje_error="El campo fila no puede estar vacio"
    }

    else {

    this.DocumentosMatriculaService.updateDocumentosMatricula(this.documentosMatriculaModel,this.id)
    .subscribe(res=>{

      Swal.fire(
        'documento actualizado!',
        'You clicked the button!',
        'success'
       )
       setTimeout(() => {
          this.router.navigate(['documentos-matricula']);
        }, 2000);
    })
   }
  }



  cerrarAlerta(){
    this.mensaje_error=""
  }

}
