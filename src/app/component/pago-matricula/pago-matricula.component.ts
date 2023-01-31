import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentDatabaseService } from 'src/app/services/student-database.service';
import { TuitionService } from 'src/app/services/tuition.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pago-matricula',
  templateUrl: './pago-matricula.component.html',
  styleUrls: ['./pago-matricula.component.css']
})
export class PagoMatriculaComponent implements OnInit {
  navTitle="Pago de matrícula"
  public pension: any
  public pensionMensual: any
  public pensionMeses:any
  public recargo: any
  private porcentajePenali = 60
  private porcentajeDesc: any
  public matricula:any

  formValue!: FormGroup
  constructor(private formBuilder:FormBuilder,
    private StudentService:StudentDatabaseService, private MatriculaService:TuitionService) { 
      this.pensionMensual=0
      this.pensionMeses=10
      this.StudentService.getPension().subscribe(response=>{
        this.pension = JSON.stringify(response.result.price)
        this.porcentajeDesc = JSON.stringify(response.result.discount)
        this.configurarMatricula()

      },error=>{
  
      });
      this.StudentService.getMatricula().subscribe(response=>{
        this.matricula = JSON.stringify(response.result)
      },error=>{
  
      });
    }

  ngOnInit(): void {

  }
  configurarMatricula(){
    if (this.pensionMeses!=undefined && this.pensionMeses!='') {
      switch (Number(this.pensionMeses)) {
        case 10:
          this.recargo =0
          let newPension = this.pension-Math.floor(this.pension*this.porcentajeDesc)/100
          this.pensionMensual = Number.parseFloat((newPension/this.pensionMeses) + this.recargo).toFixed(2);
          break;
        case 11:
          this.recargo =0
          this.pensionMensual = Number.parseFloat((this.pension/this.pensionMeses) + this.recargo).toFixed(2);
          break;
        case 12:
          this.recargo = Math.floor(this.pension*this.porcentajePenali)/100
          this.pensionMensual = Number.parseFloat((this.pension/this.pensionMeses) + this.recargo).toFixed(2);
          break;
      }
    }else{
      this.pensionMensual = 0
    }
  }
  pagarBolsillo(){
    Swal.fire({
      title: '¿Estas seguro que deseas pagar la matricula con la opcion bolsillo?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        if (Number(localStorage.getItem('bolsillo')) >= Number(this.matricula)) {
          let datos = {monto:this.matricula,metodoPago:'bolsillo',idAcudiente:localStorage.getItem('idAcudiente'),valMes:this.pensionMensual,meses:this.pensionMeses}
          this.MatriculaService.pagoMatricula(datos).subscribe(response=>{
            this.matricula = JSON.stringify(response.result)
          },error=>{

          });
          Swal.fire('Saved!', '', 'success')
        }else{
          Swal.fire('Parece que no tienes fondos suficientes', 'Favor de ingresar fondos en el bolsillo', 'info')
        }
      }
    })
  }

}
