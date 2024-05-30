import { Component, OnInit } from '@angular/core';
import { CertificateService } from 'src/app/services/certificate.service';
import { CurrencyUtils } from 'src/utils/currencyUtils';

import * as moment from 'moment';
@Component({
  selector: 'app-estado-certificado',
  templateUrl: './estado-certificado.component.html',
  styleUrls: ['./estado-certificado.component.css']
})
export class EstadoCertificadoComponent implements OnInit {
  navTitle="Estado de certificados"
  listCertificate: any;
    constructor(private certificateService:CertificateService,public currencyUtils: CurrencyUtils) { 
    this.certificateService.listCertificatesInscription(localStorage.getItem('idEstudiante')).subscribe(response=>{
      this.listCertificate = response.result
      console.log(this.listCertificate);
    },error=>{

    });
  }

  ngOnInit(): void {
  }
  formatFecha(fecha:any){
    return (moment(fecha).format('DD/MM/YYYY')==='Invalid date')?'':moment(fecha).format('DD/MM/YYYY')
  }
}
