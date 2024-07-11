import { Component, OnInit } from '@angular/core';
import { DeudasService } from 'src/app/services/deudas.service';
import { StudentDatabaseService } from 'src/app/services/student-database.service';
import { CurrencyUtils } from 'src/utils/currencyUtils';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
import Swal from'sweetalert2';

@Component({
  selector: 'app-deudas-index',
  templateUrl: './deudas-index.component.html',
  styleUrls: ['./deudas-index.component.css']
})
export class DeudasIndexComponent implements OnInit {
  navTitle="Gestion de Deudas"
  listPagos: any;
  public filterText:any;
  constructor(
    private DeudasService:DeudasService,
    private StudentDatabaseService:StudentDatabaseService,
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
    this.DeudasService.consultarDeudas().subscribe(response=>{
      this.listPagos = response.result;
      console.log(this.listPagos);
    },error=>{});
  }
  search(searchForm:any){

    if(this.filterText==""){
      this.listPagosInit();
    }else {}

  }
  formatFecha(fecha:any){
    return (moment(fecha).format('DD/MM/YYYY')==='Invalid date')?'':moment(fecha).format('DD/MM/YYYY')
  }
}