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
  listExtracurriculares: any;
  public filterText:any;
  constructor(private soportesPagosService:SoportesPagosService) { 
    this.listExtracurricularesInit()
  }

  ngOnInit(): void {
  }
  listExtracurricularesInit(){
    this.soportesPagosService.misSoportesPagos({idEstudiante:localStorage.getItem('idEstudiante')}).subscribe(response=>{
      this.listExtracurriculares = response.result
    },error=>{

    });
  }
  search(searchForm:any){

    if(this.filterText==""){
      this.listExtracurricularesInit();
    }else {
      this.soportesPagosService.misSoportesPagosSearch(searchForm.value.filtro)
      .subscribe(res=>{
        this.listExtracurriculares=res.result
      })
    }

  }
  formatFecha(fecha:any){
    return (moment(fecha).format('DD/MM/YYYY')==='Invalid date')?'':moment(fecha).format('DD/MM/YYYY')
  }
}
