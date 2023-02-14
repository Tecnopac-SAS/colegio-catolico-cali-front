import { Component, OnInit } from '@angular/core';
import { HistoricoCarteraService } from 'src/app/services/historico-cartera.service';
import * as moment from 'moment';

@Component({
  selector: 'app-historico-de-cartera',
  templateUrl: './historico-de-cartera.component.html',
  styleUrls: ['./historico-de-cartera.component.css']
})
export class HistoricoDeCarteraComponent implements OnInit {
  navTitle="Histórico de cartera"
  listPagos: any;
  public filterText:any;
  constructor(private historicoCarteraService:HistoricoCarteraService) {
    this.listPagosInit()
   }

  ngOnInit(): void {
  }
  listPagosInit(){
    this.historicoCarteraService.historicoCarteraIndex({idAcudiente:localStorage.getItem('idAcudiente')}).subscribe(response=>{
      this.listPagos = response.result
    },error=>{

    });
  }
  search(searchForm:any){

    if(this.filterText==""){
      this.listPagosInit();
    }else {
      this.historicoCarteraService.historicoCarteraSearch(searchForm.value.filtro,localStorage.getItem('idAcudiente'))
      .subscribe(res=>{
        this.listPagos=res.result
      })
    }

  }
  formatFecha(fecha:any){
    return (moment(fecha).format('DD/MM/YYYY')==='Invalid date')?'':moment(fecha).format('DD/MM/YYYY')
  }
}
