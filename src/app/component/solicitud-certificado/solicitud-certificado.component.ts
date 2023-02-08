import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CertificateService } from 'src/app/services/certificate.service';
import { PensionService } from 'src/app/services/pension.service';
import * as moment from 'moment';

@Component({
  selector: 'app-solicitud-certificado',
  templateUrl: './solicitud-certificado.component.html',
  styleUrls: ['./solicitud-certificado.component.css']
})
export class SolicitudCertificadoComponent implements OnInit {
  navTitle: any;
  canalSelect: any;
  certificateSelect: any;
  gradeSelect: any;
  listCertificate: any;
  listGrades:any
  certificate:any
  detalle:any
  constructor(private certificateService:CertificateService,private pensionService:PensionService,) { 
    this.certificateService.listCertificates().subscribe(response=>{
      this.listCertificate = response.result
    },error=>{

    });
    this.pensionService.listGrades().subscribe(response=>{
      this.listGrades = response.result
    },error=>{

    });
  }

  ngOnInit(): void {
    this.navTitle = "Solicitud de certificados";
    this.certificate = {price:''}
  }
  changeSelect(){
    this.certificate = this.listCertificate.find((obj:any) => obj.id == this.certificateSelect)

  }
  // formatFecha(fecha:any){
  //   return (moment(fecha).format('DD/MM/YYYY')==='Invalid date')?'':moment(fecha).format('DD/MM/YYYY')
  // }
  pagar(){
    if (this.certificateSelect) {
      Swal.fire({
        title: '¿Estas seguro que deseas pagar la matricula con la opcion bolsillo?',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          if (Number(localStorage.getItem('bolsillo')) >= Number(this.certificate.price)) {
            let datos = {
              monto:this.certificate.price,
              canalEntrega:this.canalSelect,
              detalle:this.detalle,
              idCertificate:this.certificateSelect,
              idGrade:this.gradeSelect,
              metodoPago:'bolsillo',
              idEstudiante:localStorage.getItem('idEstudiante')
            }
            this.certificateService.pagoInscripcion(datos).subscribe(response=>{
              // this.matricula = JSON.stringify(response.result)
              Swal.fire(response.mensaje, '', (response.status)?'success':'error')
              if (response.status) {
                this.canalSelect = ''
                this.certificateSelect = ''
                this.gradeSelect = ''
                this.detalle = ''
                this.certificate = {price:''}
              }
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
