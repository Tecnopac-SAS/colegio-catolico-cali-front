import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentDatabaseService } from 'src/app/services/student-database.service';

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
  private porcentaje = 60
  public matricula:any

  formValue!: FormGroup
  constructor(private formBuilder:FormBuilder,
    private StudentService:StudentDatabaseService) { 
      this.pensionMensual=0
      this.StudentService.getPension().subscribe(response=>{
        this.pension = JSON.stringify(response.result.price)
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
      this.recargo = Math.floor(this.pension*this.porcentaje)/100
      this.pensionMensual = Number.parseFloat((this.pension/this.pensionMeses) + this.recargo).toFixed(2);
    }else{
      this.pensionMensual = 0
    }
  }

}
