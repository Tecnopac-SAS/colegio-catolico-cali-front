import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CoursesService } from 'src/app/services/courses.service';
import * as moment from 'moment';

@Component({
  selector: 'app-courses-inscripcion',
  templateUrl: './courses-inscripcion.component.html',
  styleUrls: ['./courses-inscripcion.component.css']
})
export class CoursesInscripcionComponent implements OnInit {
  navTitle: any;
  cursoSelect: any;
  modalidadCursoSelect: any;
  listCourses: any;
  curso:any

  constructor ( private coursesService:CoursesService) { 
    this.coursesService.listCourses().subscribe(response=>{
      this.listCourses = response.result
    },error=>{

    });
  }

  ngOnInit(): void {
    this.navTitle = "Inscripción de cursos";
    this.curso = {id:'',typeCourse:'',starDate:'',finalDate:'',asignature:'',price:'',starHour:'',finalHour:'',description:'',courseAsTeacher:{name:''}}
    
        
  }
  changeSelect(){
    this.curso = this.listCourses.find((obj:any) => obj.id == this.cursoSelect)

  }
  formatFecha(fecha:any){
    return (moment(fecha).format('DD/MM/YYYY')==='Invalid date')?'':moment(fecha).format('DD/MM/YYYY')
  }
  pagarCurso(){
    if (this.cursoSelect) {
      Swal.fire({
        title: '¿Estas seguro que deseas pagar la matricula con la opcion bolsillo?',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          if (Number(localStorage.getItem('bolsillo')) >= Number(this.curso.price)) {
            let datos = {monto:this.curso.price,idCourse:this.curso.id,metodoPago:'bolsillo',idEstudiante:localStorage.getItem('idEstudiante')}
            this.coursesService.pagoInscripcion(datos).subscribe(response=>{
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
