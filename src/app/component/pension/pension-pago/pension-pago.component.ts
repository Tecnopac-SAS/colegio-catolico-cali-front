import { Component, OnInit } from '@angular/core';
import { PensionPagoService } from 'src/app/services/pension-pago.service';
import { TuitionService } from 'src/app/services/tuition.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pension-pago',
  templateUrl: './pension-pago.component.html',
  styleUrls: ['./pension-pago.component.css']
})
export class PensionPagoComponent implements OnInit {
  navTitle="Pago de pension"
  public pensionTotal=0
  public pensionesList:any
  public pensionesListSelect:any
  public mesesArr = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
  public matriculaPagada:any

  constructor(private pensionService:PensionPagoService,private matriculaService:TuitionService) { 
    this.pensionesListSelect=[]
  }
  
  
  ngOnInit(): void {
    this.getMatriculaPagada()

    this.getListPensiones()
  }

  getListPensiones(){
    let data = {idAcudiente:localStorage.getItem('idAcudiente')}
    this.pensionService.listPension(data).subscribe(res=>{
      this.pensionesList=res.result
    })
  }
  getMatriculaPagada(){
    let data = {idAcudiente:localStorage.getItem('idAcudiente')}
    this.matriculaService.getPagoMatricula(data).subscribe(res=>{
      this.matriculaPagada=res.resp
    })
  }
  parseMes(fecha:any){
    const subFecha = Number(fecha.substring(5,7))
    return this.mesesArr[subFecha-1]
  }
  checkPendientes(fecha:any,$event:any){
    this.pensionTotal=0
    this.pensionesListSelect=[]
    let text=''
    Object.keys(this.pensionesList).forEach(key => {
      let checkBox= document.getElementById('check'+this.pensionesList[key].id) as HTMLInputElement
      if((new Date(fecha) > new Date(this.pensionesList[key].fechaPago))){
        if (!checkBox.checked) {
          if (text=='') {
            text='Favor de seleccionar '+this.parseMes(this.pensionesList[key].fechaPago)
          }else{
            text+=', '+this.parseMes(this.pensionesList[key].fechaPago)
          }
        }else{
          this.pensionTotal+=this.pensionesList[key].valor
          this.pensionesListSelect.push({id:this.pensionesList[key].id,valor:this.pensionesList[key].valor})
        }
      }else{
        if (checkBox.checked) {
          this.pensionTotal+=this.pensionesList[key].valor
          this.pensionesListSelect.push({id:this.pensionesList[key].id,valor:this.pensionesList[key].valor})
        }
      }
    });
    if (text!='') {
      $event.currentTarget.checked=false
      text+=' antes de seleccionar esta pensión'
      Swal.fire(
        text,
        '',
        'info'
      )
    }
  }
}
