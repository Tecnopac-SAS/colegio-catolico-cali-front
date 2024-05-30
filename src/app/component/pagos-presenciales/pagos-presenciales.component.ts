import { Component, OnInit } from '@angular/core';
import { PagosPresencialesService } from 'src/app/services/pagos-presenciales.service';
import { CurrencyUtils } from 'src/utils/currencyUtils';
import { CertificateService } from 'src/app/services/certificate.service';
import * as moment from 'moment-timezone';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pagos-presenciales',
  templateUrl: './pagos-presenciales.component.html',
  styleUrls: ['./pagos-presenciales.component.css']
})
export class PagosPresencialesComponent implements OnInit {
  navTitle = "Pagos Presenciales"
  listPagos: any;
  listCertificados: any;
  constructor(
    public PagosPresencialesService: PagosPresencialesService,
    public currencyUtils: CurrencyUtils,
    private certificateService:CertificateService,
  ) {
    this.listPagosInit()
    this.listCertificadosInit()
  }

  ngOnInit(): void {
  }

  formatCurrency(amount: number): string {
    return this.currencyUtils.formatCurrency(amount);
  }

  listPagosInit() {
    this.PagosPresencialesService.misPagosPresenciales().subscribe(response => {
      console.log(response);
      this.listPagos = response.result
    }, error => {

    });
  }

  listCertificadosInit(){
    this.certificateService.listCertificatesInscriptionAll().subscribe(response=>{
      this.listCertificados = response.result
      console.log(this.listCertificados);
      
    },error=>{

    });
  }

  formatFecha(fecha: any) {
    const fechaColombia = moment(fecha).tz('America/Bogota');
    return fechaColombia.isValid() ? fechaColombia.format('DD/MM/YYYY - HH:mm:ss') : '';
  }

  statusChange(data: any, status: any) {

    if (status == 1) {
      Swal.fire(
        'Pago Aprobado!',
        '',
        'success'
      )
      this.PagosPresencialesService.actualizarEstadoPagoPresencial(data.id, { estado: 1 }).subscribe(response => { })
      
      if(data.servicio == 'Certificado'){

        let idEncontrado: any;
        for (const cert of this.listCertificados) {
          if (cert.paymentCode === data.paymentCode) {
            idEncontrado = cert.id;
            break;
          }
        }
        this.certificateService.updateCertificateInscriptionPaid({ paid: 1 }, idEncontrado).subscribe(response=>{})
      }
      this.listPagosInit()
    } else {
      Swal.fire(
        'Pago Rechazado!',
        '',
        'error'
      )
      this.PagosPresencialesService.actualizarEstadoPagoPresencial(data.id, { estado: 0 }).subscribe(response => { })
      this.listPagosInit()
    }
  }
}
