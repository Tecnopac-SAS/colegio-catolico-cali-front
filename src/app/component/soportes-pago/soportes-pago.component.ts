import { Component, OnInit } from '@angular/core';
import { SoportesPagosService } from 'src/app/services/soportes-pagos.service';
import { documentosService } from 'src/app/services/documentos.service';
import { CurrencyUtils } from 'src/utils/currencyUtils';


import * as moment from 'moment';

@Component({
  selector: 'app-soportes-pago',
  templateUrl: './soportes-pago.component.html',
  styleUrls: ['./soportes-pago.component.css']
})
export class SoportesPagoComponent implements OnInit {
  navTitle="Soportes de pago"
  listPagos: any;
  public filterText:any;
  documentData: any;
  constructor(
    private soportesPagosService:SoportesPagosService,
    private documentosService: documentosService,
    private currencyUtils: CurrencyUtils,
    ) { 
    this.listPagosInit()

  }

  ngOnInit(): void {
  }

  formatCurrency(amount: number): string {
    return this.currencyUtils.formatCurrency(amount);
  }

  listPagosInit(){
    this.soportesPagosService.misSoportesPagos(localStorage.getItem('idAcudiente')).subscribe(response=>{
      console.log(response);
      this.listPagos = response.result
    },error=>{

    });
  }
  search(searchForm:any){

    if(!this.filterText){
      this.listPagosInit();
    }else {
      this.soportesPagosService.misSoportesPagosSearch(searchForm.value.filtro,localStorage.getItem('idEstudiante'))
      .subscribe(res=>{
        this.listPagos=res.result
      })
    }

  }
  descargaSoporte(data: any){
    this.documentData = {
      paymentCode: data.paymentCode,
      soporte_pago_monto: data.monto,
      soporte_pago_concepto: data.viaPago
    }
    this.documentosService.crearPDFDocumento(this.documentData, 8).subscribe(res => {
      window.location.href = res.pdfDownloadUrl;
    });
  }
  formatFecha(fecha:any){
    return (moment(fecha).format('DD/MM/YYYY')==='Invalid date')?'':moment(fecha).format('DD/MM/YYYY')
  }
}
