import { Component, OnInit } from '@angular/core';
import { CertificateService } from 'src/app/services/certificate.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-certificate-index-inscription',
  templateUrl: './certificate-index-inscription.component.html',
  styleUrls: ['./certificate-index-inscription.component.css']
})
export class CertificateIndexInscriptionComponent implements OnInit {
  navTitle="Certificados"
  listCertificados: any;
  certificateModel: any;
  public filterText:any;
  constructor(private certificateService:CertificateService) { 
    this.listCertificadosInit()
    this.certificateModel = { status:0}
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
  statusChange(data:any){
    this.certificateModel.status = data.status
     if (data.status==0) {
       this.certificateModel.status= 1;
       Swal.fire(
         'habilitado!',
         '',
         'success'
        )
     }
 
     else if (data.status=1) {
       this.certificateModel.status= 0;
       Swal.fire(
         'deshabilitado!',
         '',
         'warning'
        )
     }
     this.certificateService.statusChange(this.certificateModel,data.id).subscribe(res=>{
      if (res.mensaje=='ok') {
        this.listCertificadosInit()
      }
     },error=>{

     });
 
 
   }
}
