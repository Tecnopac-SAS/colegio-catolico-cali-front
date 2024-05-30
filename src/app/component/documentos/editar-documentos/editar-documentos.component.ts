import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { Documentos } from 'src/app/models/documentos.model';
import { documentosService } from 'src/app/services/documentos.service';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from'sweetalert2';

@Component({
  selector: 'app-editar-documentos',
  templateUrl: './editar-documentos.component.html',
  styleUrls: ['./editar-documentos.component.css']
})
export class EditarDocumentosComponent implements OnInit {
  
  navTitle="Modificación de Documentos";
  id: any;
  content = '';
  titulo:any = '';
  template:any = '';
  variables: any = [
    'acudiente_nombre',
    'estudiante_nombre',
    'estudiante_grado',
    'valor_matricula_letras',
    'valor_matricula',
    'fecha_actual',
    'fecha_actual_anio',
    'fecha_actual_mes',
    'fecha_actual_dia',
    'tabla_pensiones',
    'total_pensiones',
    'total_pensiones_letras',
    'mensualidad_letras',
    'mensualidad',
  ];
  formDocumento!: FormGroup;
  documentosModel:Documentos= new Documentos();
  public mensaje_ok:any;
  public mensaje_error:any;
  documento: any;
  constructor(
    private formBuilder:FormBuilder,
    private documentosService:documentosService,
    private router:Router,
    private route : ActivatedRoute,
    ) {
  }

  ngOnInit(): void {
    this.fieldCaptureIndex();
  }

  loadVariable(event: Event){
    let variableButtom = event.target as HTMLInputElement;
    let variableValue = variableButtom.value;
    this.template = `${this.template}{{${variableValue}}}`;
  }

  fieldCaptureIndex(){
    this.formDocumento = this.formBuilder.group({
      titulo: ['', Validators.required],
      template: ['', Validators.required],
    });

    this.route.params.subscribe(params=>{
      console.log(params.id);
      
      this.id = params.id;
      this.documentosService.getDocumento(this.id).subscribe(
        response=>{
          this.documento= response
          console.log(this.documento)
          this.formDocumento.controls['titulo'].setValue(this.documento.resp.titulo)
          this.formDocumento.controls['template'].setValue(this.documento.resp.template)
        }
      )
    })
  }

  editarDocumento(){
    this.documentosModel.titulo = this.formDocumento.value.titulo;
    this.documentosModel.template = this.formDocumento.value.template;
    console.log(this.documentosModel);
    console.log(this.formDocumento.value);
    
    if(this.documentosModel.titulo=="" || this.documentosModel.template==""){
      this.mensaje_error="Hay campos que estan vacíos!"
    }else{
      this.mensaje_ok="Se modificó correctamente"
      console.log(this.id);
      
      this.documentosService.editarDocumento(this.documentosModel, this.id).subscribe(res=>{
        console.log(res);
      },
      err=>{
        console.log(err)
      });
      Swal.fire(
        'Documento modificado con exito!',
        '',
        'success'
        ).then((result) => {
          if(result.isConfirmed){
            this.router.navigate([`/gestion-documentos`]);
          }
        });
      
    }
  }

  cerrarAlerta(){
    this.mensaje_error=""
  }
}
