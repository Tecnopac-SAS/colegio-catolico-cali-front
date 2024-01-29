import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { Documentos } from 'src/app/models/documentos.model';
import { documentosService } from 'src/app/services/documentos.service';
import Swal from'sweetalert2';

@Component({
  selector: 'app-crear-documentos',
  templateUrl: './crear-documentos.component.html',
  styleUrls: ['./crear-documentos.component.css']
})
export class CrearDocumentosComponent implements OnInit {
  
  navTitle="Creacion de Documentos";
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
  constructor(
    private formBuilder:FormBuilder,
    private documentosService:documentosService,
    ) {
  }

  ngOnInit(): void {
    this.fieldCaptureEstudiantes();
  }

  loadVariable(event: Event){
    let variableButtom = event.target as HTMLInputElement;
    let variableValue = variableButtom.value;
    this.content = `${this.content}{{${variableValue}}}`;
  }

  fieldCaptureEstudiantes(){
    this.formDocumento = this.formBuilder.group({
      titulo: ['', Validators.required],
      template: ['', Validators.required],
    });

  }

  crearDocumento(){
    this.documentosModel.titulo = this.formDocumento.value.titulo;
    this.documentosModel.template = this.formDocumento.value.template;
    console.log(this.documentosModel);
    console.log(this.formDocumento.value);
    
    if(this.documentosModel.titulo=="" || this.documentosModel.template==""){
      this.mensaje_error="Hay campos que estan vacíos!"
    }else{
      this.mensaje_ok="Se registro correctamente"
      this.documentosService.crearDocumento(this.documentosModel).subscribe(res=>{
        console.log(res);
      },
      err=>{
        console.log(err)
      });
      Swal.fire(
        'Documento Creado con exito!',
        '',
        'success'
        );
      
    }
  }

  cerrarAlerta(){
    this.mensaje_error=""
  }
}
