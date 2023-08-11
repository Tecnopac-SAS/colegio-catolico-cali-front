import { Component, OnInit } from '@angular/core';
import { documentosService } from 'src/app/services/documentos.service';


@Component({
  selector: 'app-gestion-documentos',
  templateUrl: './gestion-documentos.component.html',
  styleUrls: ['./gestion-documentos.component.css']
})
export class GestionDocumentosComponent implements OnInit {

  navTitle="Gestión de Documentos";
  content = '';
  public filterText:any;
  documentos: any;
  
  constructor(private documentosService:documentosService) { }

  ngOnInit(): void {
   this.listDocumentosInit(); 
  }

  listDocumentosInit(){
    this.documentosService.getDocumentos().subscribe(response=>{
      this.documentos = response.resp
      console.log(response.resp);
    },error=>{
      console.log(error);
      
    });
  }

  search(searchForm:any){

    if(this.filterText==""){
      this.listDocumentosInit();
    }else {
      // this.documentosService.historicoCarteraSearch(searchForm.value.filtro,localStorage.getItem('idAcudiente'))
      // .subscribe(res=>{
      //   this.listDocumentos=res.result
      // })
    }

  }

}




