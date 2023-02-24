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
  private descuento=3
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
          if (this.pensionesList[key].estatus!='Pagado') {
            this.pensionTotal+=this.pensionesList[key].valor
            this.pensionesListSelect.push({id:this.pensionesList[key].id,valor:this.pensionesList[key].valor})
          }
        }
      }else{
        if (checkBox.checked) {
          if (this.pensionesList[key].estatus!='Pagado') {
            this.pensionTotal+=this.pensionesList[key].valor
            this.pensionesListSelect.push({id:this.pensionesList[key].id,valor:this.pensionesList[key].valor})
          }
        }
      }
    });
    if (this.pensionesListSelect.length>=3) {
      this.pensionTotal = this.pensionTotal - (Math.floor(this.pensionTotal*this.descuento)/100)
      let valorNew = this.pensionTotal/this.pensionesListSelect.length
      Object.keys(this.pensionesListSelect).forEach(key => {
        this.pensionesListSelect[key].valor = valorNew
      });
    }
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
  pagarPension(){
    Swal.fire({
      title: '¿Estas seguro que deseas pagar la matricula con la opcion bolsillo?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        if (this.pensionesListSelect.length==0) {
          Swal.fire('Parece que aun no seleccionas alguna pensión', 'Favor de ingresar al menos una pensión', 'info')
        } else {
          if (Number(localStorage.getItem('bolsillo')) >= Number(this.pensionTotal)) {
            let datos = {pensiones:this.pensionesListSelect}
            this.pensionService.pagoPension(datos,'bolsillo').subscribe(response=>{
              // this.matricula = JSON.stringify(response.result)
              Swal.fire(response.mensaje, '', (response.status)?'success':'error').then((result) => {
                if (result.isConfirmed) {
                  location.reload()
                }
              } )
            },error=>{
  
            });
          }else{
            Swal.fire('Parece que no tienes fondos suficientes', 'Favor de ingresar fondos en el bolsillo', 'info')
          }
        }
      }
    })
  }
}
