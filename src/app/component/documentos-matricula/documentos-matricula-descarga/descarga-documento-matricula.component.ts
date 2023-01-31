import { Component, OnInit } from '@angular/core';
import { DocumentosMatriculaService } from 'src/app/services/documentos-matricula.service';
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
  private idEstudiante:Number
  constructor(private DocumentosMatriculaService:DocumentosMatriculaService) { 
    this.idEstudiante = Number(localStorage.getItem('idEstudiante'))
    this.DocumentosMatriculaService.listDocumentosMatriculaByStudent(Number(this.idEstudiante))
      .subscribe(res=>{
        this.listDoc =res
      })
  }

  ngOnInit(): void {
  }
  descargarDocumento(){
    if (this.docId!=undefined) {
      this.DocumentosMatriculaService.obtenerDocumentosMatricula(Number(this.docId))
      .subscribe(res=>{
        window.open(res.result.documentUrl, '_blank');
      })
    }else{
      Swal.fire(
        'Favor de seleccionar un documento',
        '',
        'warning'
       )
    }
  }
}
