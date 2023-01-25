import { Component, OnInit } from '@angular/core';
import { PensionPagoService } from 'src/app/services/pension-pago.service';

@Component({
  selector: 'app-pension-pago',
  templateUrl: './pension-pago.component.html',
  styleUrls: ['./pension-pago.component.css']
})
export class PensionPagoComponent implements OnInit {
  navTitle="Pago de pension"
  public pensionTotal:any
  public pensionesList:any
  public mesesArr = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']

  constructor(private pensionService:PensionPagoService) { 
    
  }

  ngOnInit(): void {
    this.getListPensiones()
  }

  getListPensiones(){
    let data = {idAcudiente:localStorage.getItem('idAcudiente')}
    this.pensionService.listPension(data).subscribe(res=>{
      this.pensionesList=res.result
    })
  }
  parseMes(fecha:any){
    const subFecha = Number(fecha.substring(5,7))
    return this.mesesArr[subFecha-1]
  }
}
