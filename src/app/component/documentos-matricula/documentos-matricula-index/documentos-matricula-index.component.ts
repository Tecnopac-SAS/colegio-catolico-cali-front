import { Component, OnInit } from '@angular/core';
import { DocumentosMatricula } from 'src/app/models/documentos-matricula.model';
import { DocumentosMatriculaService } from 'src/app/services/documentos-matricula.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import Swal from'sweetalert2';


@Component({
  selector: 'app-documentos-matricula-index',
  templateUrl: './documentos-matricula-index.component.html',
  styleUrls: ['./documentos-matricula-index.component.css']
})
export class DocumentosMatriculaIndexComponent implements OnInit {

  grade !: any;
  navTitle="Documentos matricula"
  formValue !:FormGroup
  public dataDocumentosMatricula:any
  public filter:any;
  public filterText:any;
  documentosMatriculaModel:DocumentosMatricula = new DocumentosMatricula();
  id !: any;
  constructor(
    private formBuilder:FormBuilder,
    private DocumentosMatriculaService:DocumentosMatriculaService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.listDocumentosMatriculas()
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

  listDocumentosMatriculas(){
    this.DocumentosMatriculaService.listDocumentosMatriculas()
    .subscribe(res=>{
      this.dataDocumentosMatricula=res
      console.log(this.dataDocumentosMatricula)
    })
  }

  search(searchForm:any){

    if(this.filterText==""){
      this.listDocumentosMatriculas();
    }

    else {
      this.DocumentosMatriculaService.listDocumentosMatricula(searchForm.value.filtro)
      .subscribe(res=>{
        this.dataDocumentosMatricula=res
        console.log(res.result)
      })
    }

  }

  deshabilitar(data:any){
   this.documentosMatriculaModel.isActive = data.isActive
    if (data.isActive==0) {
      this.documentosMatriculaModel.isActive= 1;
      Swal.fire(
        'habilitado!',
        '',
        'success'
       )
    }

    else if (data.isActive=1) {
      this.documentosMatriculaModel.isActive= 0;
      Swal.fire(
        'deshabilitado!',
        '',
        'warning'
       )
    }
    this.DocumentosMatriculaService.deshabilitar(this.documentosMatriculaModel,data.id)
    .subscribe(res=>{
    this.listDocumentosMatriculas()
    })


  }

}
