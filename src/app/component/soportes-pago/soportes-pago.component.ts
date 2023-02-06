import { Component, OnInit } from '@angular/core';
import { SoportesPagosService } from 'src/app/services/soportes-pagos.service';
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
  constructor(private soportesPagosService:SoportesPagosService) { 
    this.listPagosInit()
  }

  ngOnInit(): void {
  }
  listPagosInit(){
    this.soportesPagosService.misSoportesPagos({idEstudiante:localStorage.getItem('idEstudiante')}).subscribe(response=>{
      this.listPagos = response.result
    },error=>{

    });
  }
  search(searchForm:any){

    if(this.filterText==""){
      this.listPagosInit();
    }else {
      this.soportesPagosService.misSoportesPagosSearch(searchForm.value.filtro,localStorage.getItem('idEstudiante'))
      .subscribe(res=>{
        this.listPagos=res.result
      })
    }

  }
  formatFecha(fecha:any){
    return (moment(fecha).format('DD/MM/YYYY')==='Invalid date')?'':moment(fecha).format('DD/MM/YYYY')
  }
}
