import { Component, OnInit } from '@angular/core';
import { DocumentosMatriculaService } from 'src/app/services/documentos-matricula.service';
import { documentosService } from 'src/app/services/documentos.service';
import { StudentDatabaseService } from 'src/app/services/student-database.service';
import { UserService } from 'src/app/services/user.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-descarga-documento-matricula',
  templateUrl: './descarga-documento-matricula.component.html',
  styleUrls: ['./descarga-documento-matricula.component.css']
})
export class DescargaDocumentoMatriculaComponent implements OnInit {
  navTitle = 'Descarga de documentos'
  public listDoc:any
  public docId:any
  estudiante: any;
  docSelected: any;
  acudiente:any
  data: any;
  constructor(
    private DocumentosMatriculaService:DocumentosMatriculaService,
    private UserService:UserService,
    private StudentDatabaseService:StudentDatabaseService,
    private documentosService:documentosService
    ) { 
    this.DocumentosMatriculaService.listDocumentosMatriculas()
      .subscribe(res=>{
        this.listDoc =res
        console.log(this.listDoc);
        
      })
    this.docId = '';      

    this.StudentDatabaseService.obtenerStudentDatabase(Number(localStorage.getItem('idEstudiante'))).subscribe(response =>{
        console.log(response);
        this.estudiante= response.result;
      }
    );

  }

  ngOnInit(): void {
  }

  descargarDocumento(){

    this.data;
    switch (this.docId) {
      case '1':
        this.data = {
          acudiente_nombre: localStorage.getItem('usuario'),
          estudiante_nombre: `${this.estudiante.nombres} ${this.estudiante.apellidos}`,
          estudiante_grado: `${this.estudiante.grado}`,
        }
      break;
      case '2':
        this.data = {
          
        }
      break;
      case '3':
        this.data = {
          
        }
      break;
    }
    
    this.documentosService.crearPDFDocumento(this.data, this.docId)
    .subscribe(res => {
      window.location.href = res.pdfDownloadUrl
    })
  }
}
