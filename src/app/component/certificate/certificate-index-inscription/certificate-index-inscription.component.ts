import { Component, OnInit } from '@angular/core';
import { CertificateService } from 'src/app/services/certificate.service';
import * as moment from 'moment';

@Component({
  selector: 'app-certificate-index-inscription',
  templateUrl: './certificate-index-inscription.component.html',
  styleUrls: ['./certificate-index-inscription.component.css']
})
export class CertificateIndexInscriptionComponent implements OnInit {
  navTitle="Certificados"
  listCertificados: any;
  public filterText:any;
  constructor(private certificateService:CertificateService) { 
    this.listCertificadosInit()
  }

  ngOnInit(): void {
  }
  listCertificadosInit(){
    this.certificateService.listCertificatesInscriptionAll().subscribe(response=>{
      this.listCertificados = response.result
    },error=>{

    });
  }
  search(searchForm:any){

    if(!this.filterText){
      this.listCertificadosInit();
    }else {
      this.certificateService.listCertificatesInscriptionAllSearch(searchForm.value.filtro, localStorage.getItem('idEstudiante'))
      .subscribe(res=>{
        this.listCertificados=res.result
      })
    }

  }
  formatFecha(fecha:any){
    return (moment(fecha).format('DD/MM/YYYY')==='Invalid date')?'':moment(fecha).format('DD/MM/YYYY')
  }
}
