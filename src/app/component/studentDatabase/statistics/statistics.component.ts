import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { StudentDatabaseService } from 'src/app/services/student-database.service';
import { StudentDatabase } from 'src/app/models/studentDatabase.model';
import Swal from'sweetalert2';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  dataMatriculados:any;
  dataDesertores:any;
  dataInscritos:any;
  dataGraduados:any;
  formValue !: FormGroup;
  formValuePrecio !: FormGroup;
  studentDatabaseModel:StudentDatabase = new StudentDatabase();
 
  constructor(private studentDatabaseService:StudentDatabaseService,private formBuilder:FormBuilder,) 
  {

  }

  ngOnInit(): void {
   this.contadorMatriculados();
   this.contadorDesertores();
   this.contadorInscritos();
   this.contadorGraduados();
  }
 
  contadorMatriculados(){
      this.studentDatabaseService.listStudentDatabaseTipoCount("Matriculado")
      .subscribe(res=>{
        this.dataMatriculados=res.result[0].contador
        console.log(res)
      })
   
  }

  contadorDesertores(){
    this.studentDatabaseService.listStudentDatabaseTipoCount("Desertor")
    .subscribe(res=>{
      this.dataDesertores=res.result[0].contador
      console.log(res)
    })
  }

  contadorInscritos(){
    this.studentDatabaseService.listStudentDatabaseTipoCount("Inscrito")
    .subscribe(res=>{
      this.dataInscritos=res.result[0].contador
    })
  }

  contadorGraduados(){
    this.studentDatabaseService.listStudentDatabaseTipoCount("Graduado")
    .subscribe(res=>{
      this.dataGraduados=res.result[0].contador
    })
  }



}
