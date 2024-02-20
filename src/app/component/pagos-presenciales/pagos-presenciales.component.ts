import { Component, OnInit } from '@angular/core';
import { PagosPresencialesService } from 'src/app/services/pagos-presenciales.service';
import { CurrencyUtils } from 'src/utils/currencyUtils';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-pagos-presenciales',
  templateUrl: './pagos-presenciales.component.html',
  styleUrls: ['./pagos-presenciales.component.css']
})
export class PagosPresencialesComponent implements OnInit {
  navTitle="Pagos Presenciales"
  listPagos: any;
  constructor(
    private PagosPresencialesService:PagosPresencialesService,
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
    this.PagosPresencialesService.misPagosPresenciales().subscribe(response=>{
      console.log(response);
      this.listPagos = response.result
    },error=>{

    });
  }

  formatFecha(fecha: any) {
    const fechaColombia = moment(fecha).tz('America/Bogota');
    return fechaColombia.isValid() ? fechaColombia.format('DD/MM/YYYY - HH:mm:ss') : '';
  }
}
