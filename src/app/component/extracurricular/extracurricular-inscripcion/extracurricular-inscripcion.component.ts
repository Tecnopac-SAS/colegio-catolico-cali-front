import { Component, OnInit } from '@angular/core';
import { ExtracurricularService } from 'src/app/services/extracurricular.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-extracurricular-inscripcion',
  templateUrl: './extracurricular-inscripcion.component.html',
  styleUrls: ['./extracurricular-inscripcion.component.css']
})
export class ExtracurricularInscripcionComponent implements OnInit {
  navTitle: any;
  extracurricularSelect: any;
  listExtracurriculares: any;
  extracurricular:any
  constructor(private extracurricularService:ExtracurricularService) {
    this.extracurricularService.listExtracurriculares().subscribe(response=>{
      this.listExtracurriculares = response.result
    },error=>{

    });
   }

  ngOnInit(): void {
    this.navTitle = "Inscripciones a extracurriculares";
    this.extracurricular = {id:'',activity:'',startDate:'',finalDate:'',price:'',starHour:'',finalHour:'',description:'',extracurricularAsTeacher:{name:''}}
  }
  changeSelect(){
    this.extracurricular = this.listExtracurriculares.find((obj:any) => obj.id == this.extracurricularSelect)
  }
  formatFecha(fecha:any){
    return (moment(fecha).format('DD/MM/YYYY')==='Invalid date')?'':moment(fecha).format('DD/MM/YYYY')
  }
  pagar(){
    if (this.extracurricularSelect) {
      Swal.fire({
        title: '¿Estas seguro que deseas pagar el extracurricular con la opcion bolsillo?',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          if (Number(localStorage.getItem('bolsillo')) >= Number(this.extracurricular.price)) {
            let datos = {monto:this.extracurricular.price,idExtracurricular:this.extracurricular.id,metodoPago:'bolsillo',idEstudiante:localStorage.getItem('idEstudiante')}
            this.extracurricularService.pagoExtracurricular(datos).subscribe(response=>{
              // this.matricula = JSON.stringify(response.result)
              Swal.fire(response.mensaje, '', (response.status)?'success':'error')
            },error=>{
  
            });
          }else{
            Swal.fire('Parece que no tienes fondos suficientes', 'Favor de ingresar fondos en el bolsillo', 'info')
          }
        }
      })
    }else{
      Swal.fire('Favor de seleccionar un curso', '', 'info')
    }
  }
}
