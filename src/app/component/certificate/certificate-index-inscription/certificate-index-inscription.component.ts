import { Component, OnInit } from '@angular/core';
import { CertificateService } from 'src/app/services/certificate.service';
import { CurrencyUtils } from 'src/utils/currencyUtils';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-certificate-index-inscription',
  templateUrl: './certificate-index-inscription.component.html',
  styleUrls: ['./certificate-index-inscription.component.css']
})
export class CertificateIndexInscriptionComponent implements OnInit {
  navTitle="Certificados (Solicitudes)"
  listCertificados: any;
  certificateModel: any;
  public filterText:any;
  constructor(
    private certificateService:CertificateService,
    public currencyUtils: CurrencyUtils) { 
    this.listCertificadosInit()
    this.certificateModel = { status:0}
  }

  ngOnInit(): void {
  }
  listCertificadosInit(){
    this.certificateService.listCertificatesInscriptionAll().subscribe(response=>{
      this.listCertificados = response.result
      console.log(this.listCertificados);
      
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
  statusChange(data: any, status: any){
    if(status == 1){
      this.certificateModel.status = data.status
      this.certificateModel.status= 1;
      Swal.fire(
        'Solicitud Aprobada!',
        '',
        'success'
       )
    }else{
      this.certificateModel.status= 0;
      Swal.fire(
        'Solicitud Rechazada!',
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
