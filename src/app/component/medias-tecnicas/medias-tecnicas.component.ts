import { Component, OnInit } from '@angular/core';
import { TechnicalService } from 'src/app/services/technical.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-medias-tecnicas',
  templateUrl: './medias-tecnicas.component.html',
  styleUrls: ['./medias-tecnicas.component.css']
})
export class MediasTecnicasComponent implements OnInit {
  navTitle: any;
  mediaSelect: any;
  listTechnicals: any;
  media:any
  constructor(private technicalService:TechnicalService) {
    this.technicalService.listTechnicals().subscribe(response=>{
      this.listTechnicals = response.result
    },error=>{

    });
   }

  ngOnInit(): void {
    this.navTitle = "Inscripción a medias técnicas";
    this.media = {id:'',course:'',startDate:'',finalDate:'',price:'',starHour:'',finalHour:'',description:'',mediasTecnicasAsTeacher:{name:''}}
    
  }
  changeSelect(){
    this.media = this.listTechnicals.find((obj:any) => obj.id == this.mediaSelect)
  }
  formatFecha(fecha:any){
    return (moment(fecha).format('DD/MM/YYYY')==='Invalid date')?'':moment(fecha).format('DD/MM/YYYY')
  }
  pagar(){
    if (this.mediaSelect) {
      Swal.fire({
        title: '¿Estas seguro que deseas pagar la media técnica con la opción bolsillo?',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          if (Number(localStorage.getItem('bolsillo')) >= Number(this.media.price)) {
            let datos = {monto:this.media.price,idTechnical:this.media.id,metodoPago:'bolsillo',idEstudiante:localStorage.getItem('idEstudiante')}
            this.technicalService.pagoMedia(datos).subscribe(response=>{
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
