import { Component, OnInit } from '@angular/core';
import { TuitionService } from 'src/app/services/tuition.service';

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.css']
})
export class MatriculaComponent implements OnInit {
  public navTitle:any
  public matriculaPagada: any;

  constructor(private matriculaService:TuitionService,) { 
    this.matriculaPagada = false;
  }

  ngOnInit(): void {
    this.navTitle="Matricula"
    this.getMatriculaPagada();
  }
  getMatriculaPagada(){
    let data = {idAcudiente:localStorage.getItem('idAcudiente')}
    this.matriculaService.getPagoMatricula(data).subscribe(res=>{
      this.matriculaPagada=res.resp
      console.log(this.matriculaPagada);
    })
  }

}
