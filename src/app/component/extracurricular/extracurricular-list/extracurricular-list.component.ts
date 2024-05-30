import { Component, OnInit } from '@angular/core';
import { ExtracurricularService } from 'src/app/services/extracurricular.service';
import * as moment from 'moment';
import Swal from'sweetalert2';
import { animate } from '@angular/animations';

@Component({
  selector: 'app-extracurricular-list',
  templateUrl: './extracurricular-list.component.html',
  styleUrls: ['./extracurricular-list.component.css']
})
export class ExtracurricularListComponent implements OnInit {
  navTitle="Mis extracurriculares"
  listExtracurriculares: any;
  disableMultiSelect: boolean;
  selectedExtrs: any;
  constructor(private extracurricularService:ExtracurricularService) { 
    this.disableMultiSelect = true;
    this.selectedExtrs = [];
    this.listExtracurriculares = [];
    this.extracurricularService.misExtracurriculares({idEstudiante:localStorage.getItem('idEstudiante')}).subscribe(response=>{
      this.listExtracurriculares = response.result
    console.log(this.listExtracurriculares);
    },error=>{

    });
  }

  ngOnInit(): void {
  }

  desvincularseVarios() {
    const promises = this.selectedExtrs.map((extr: any) => {
      console.log(extr);
      return new Promise<void>((resolve, reject) => {
        this.extracurricularService.desvincularse({ idExtracurricular: extr.idExtracurricular, idEstudiante: localStorage.getItem('idEstudiante') }, extr.id)
          .subscribe(res => {
            // Realiza cualquier acción necesaria en caso de éxito
            resolve();
          }, error => {
            // Realiza cualquier acción necesaria en caso de error
            reject(error);
          });
      });
    });
  
    Swal.fire({
      title: 'Desvinculando extracurriculares...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  
    Promise.all(promises)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: `¡Desvinculado de (${this.selectedExtrs.length}) Extracurriculares!`,
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Hubo un error al desvincularse',
          text: error.message || 'Ocurrió un error inesperado',
          showConfirmButton: true
        });
      });
  }
  

  desvincularse(id: any, idExtracurricular: any){
    console.log(idExtracurricular);
    this.extracurricularService.desvincularse({ idExtracurricular: idExtracurricular, idEstudiante: localStorage.getItem('idEstudiante')},id)
    .subscribe(res => {
      Swal.fire({
        icon: 'success',
        title: `¡Desvinculado!`,
      });
    }, error => {
    });
  }

  selectExtra(id: any, idExtracurricular: any, $event: any){
    this.disableMultiSelect = false;
    const isChecked = ($event.target as HTMLInputElement).checked;
    if(isChecked){
      this.selectedExtrs.push({id: id, idExtracurricular: idExtracurricular});
      console.log(this.selectedExtrs);
    }else{
      this.selectedExtrs.pop({id: id, idExtracurricular: idExtracurricular});
      console.log(this.selectedExtrs);
    }
  }
  formatFecha(fecha:any){
    return (moment(fecha).format('DD/MM/YYYY')==='Invalid date')?'':moment(fecha).format('DD/MM/YYYY')
  }

}
