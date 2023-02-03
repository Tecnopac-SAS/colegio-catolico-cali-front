import { Component, OnInit } from '@angular/core';
import { ExtracurricularService } from 'src/app/services/extracurricular.service';
import * as moment from 'moment';

@Component({
  selector: 'app-extracurricular-list',
  templateUrl: './extracurricular-list.component.html',
  styleUrls: ['./extracurricular-list.component.css']
})
export class ExtracurricularListComponent implements OnInit {
  navTitle="Mis extracurriculares"
  listExtracurriculares: any;
  constructor(private extracurricularService:ExtracurricularService) { 
    this.extracurricularService.misExtracurriculares({idEstudiante:localStorage.getItem('idEstudiante')}).subscribe(response=>{
      this.listExtracurriculares = response.result
    },error=>{

    });
  }

  ngOnInit(): void {
  }
  formatFecha(fecha:any){
    return (moment(fecha).format('DD/MM/YYYY')==='Invalid date')?'':moment(fecha).format('DD/MM/YYYY')
  }

}
