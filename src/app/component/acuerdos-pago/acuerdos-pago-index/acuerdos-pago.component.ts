import { Component, OnInit } from '@angular/core';
import { acuerdosPagos } from 'src/app/services/acuerdos-pago.service';

@Component({
  selector: 'app-acuerdos-pago',
  templateUrl: './acuerdos-pago.component.html',
  styleUrls: ['./acuerdos-pago.component.css']
})
export class AcuerdosPagoComponent implements OnInit {

  navTitle = 'Acuerdos de Pago'
  public filterText:any;
  acuerdosPagos: any;

  constructor(
    private acuerdosPagosService:acuerdosPagos
  ) { }

  ngOnInit(): void {
    this.listAcuerdosPagos(); 
  }

 
   listAcuerdosPagos(){
     this.acuerdosPagosService.getAcuerdosPagos().subscribe(response=>{
       this.acuerdosPagos = response.result
       console.log(response.resp);
     },error=>{
       console.log(error);
     });
   }
 
   search(searchForm:any){
 
     if(this.filterText==""){
       this.listAcuerdosPagos();
     }else {
       this.acuerdosPagosService.getAcuerdoPagoSearch(searchForm.value.filtro,localStorage.getItem('idAcudiente'))
       .subscribe(res=>{
         this.acuerdosPagos=res.result
       })
     }
 
   }
}
