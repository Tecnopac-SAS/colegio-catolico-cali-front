import { Component, OnInit } from '@angular/core';
import { TransportationService } from 'src/app/services/transportation.service';
import { TransportationRequestService } from 'src/app/services/transportationRequest.service';
import { Transportation } from 'src/app/models/transportation.model';
import { TransportationRequests } from 'src/app/models/transportation-requests.model';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { CurrencyUtils } from 'src/utils/currencyUtils';

import Swal from'sweetalert2';

@Component({
  selector: 'app-acudiente-transportation',
  templateUrl: './acudiente-transportation.component.html',
  styleUrls: ['./acudiente-transportation.component.css']
})
export class AcudienteTransportationComponent implements OnInit {

  grade !: any;
  navTitle="Solicitud de Transporte"
  TransportationRequests:TransportationRequests= new TransportationRequests();
  formValueExtra!: FormGroup;
  public dataTransportation:any
  public dataTransportationRequests:any
  public rutaObtenida:any;
  TransportationModel:Transportation = new Transportation();
  id !: any;
  rutaCargada:any;
  mensaje_error: any;
  mensaje_ok: any;
  toggleTable: boolean;
  toggleRouteType: boolean;
  dataEstudentCurrentRoutes: any;
  hasRoutes: boolean;
  constructor(
    private formBuilder:FormBuilder,
    private transportationService:TransportationService,
    public currencyUtils: CurrencyUtils,
    private transportationRequestService:TransportationRequestService,
    private router:Router
  ) { 
    this.toggleTable = false;
    this.toggleRouteType = false;
    this.hasRoutes = false;
  }

  ngOnInit(): void {
    this.validateRoute();
    this.fieldCaptureExtra()
  }

  cargaRuta(id: number){
    this.transportationService.obtenerTransporte((id))
    .subscribe(res=>{
      this.rutaCargada=[res.result]
    })
  }

  fieldCaptureExtra(){
    this.formValueExtra = this.formBuilder.group({
      acudienteid: [''],
      estudianteid: [''],
      routeType: [''],
      datosResponsable: [''],
      direccion_recogida: [''],
      direccion_entrega: [''],
    })
  }

  solicitarRuta(){
    this.TransportationRequests.routeType = this.formValueExtra.value.routeType;
    this.TransportationRequests.datosResponsable = this.formValueExtra.value.datosResponsable;
    this.TransportationRequests.direccion_recogida = this.formValueExtra.value.direccion_recogida;
    this.TransportationRequests.direccion_entrega = this.formValueExtra.value.direccion_entrega;

    const solicitudData = {
      routeid: null,
      acudienteid: localStorage.getItem('idAcudiente'),
      estudianteid: localStorage.getItem('idEstudiante'),
      estado: 1,
      routeType: this.TransportationRequests.routeType,
      datosResponsable: this.TransportationRequests.datosResponsable,
      direccion_recogida: this.TransportationRequests.direccion_recogida,
      direccion_entrega: this.TransportationRequests.direccion_entrega,
    }
    console.log(solicitudData);

    this.transportationRequestService.createTransporteSolicitud(solicitudData)
    .subscribe(res=>{
      Swal.fire({
        icon: res.status ? 'success' : 'error',
        title: res.mensaje,
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        } else if (result.isDenied) { }
      });
    },
    err=>{
      console.log(err)
    })
    
  }

  

  listTransportations(jornada: number){
    this.transportationService.listTransportes(jornada)
    .subscribe(res=>{
      this.dataTransportation=res.result
      console.log(this.dataTransportation)
    })
  }
  listTransportationsRequests(){
    this.transportationRequestService.listSolicitudesTransportes()
    .subscribe(res=>{
      this.dataTransportationRequests=res.result
      console.log(this.dataTransportationRequests)
    })
  }
  validateRoute(){
    let lsEstudiante = localStorage.getItem('idEstudiante');
    let lsAcudiente = localStorage.getItem('idAcudiente');
    this.transportationRequestService.listSolicitudesEstudianteTransportes(lsEstudiante,lsAcudiente)
    .subscribe(res=>{
      this.dataEstudentCurrentRoutes = res.result;
      this.dataEstudentCurrentRoutes.length > 0 ? this.hasRoutes = true : this.hasRoutes = false;
      console.log(this.dataEstudentCurrentRoutes)
    });
  }

  formatoFecha(fechaEntrada: any) {
    const fecha = new Date(fechaEntrada);
    const año = fecha.getFullYear();
    const mes = this.getNombreMes(fecha.getMonth() + 1);
    const dia = fecha.getDate().toString().padStart(2, '0');
    
    return `${dia}/${mes}/${año}`;
  }

  getNombreMes(numeroMes: number): string {
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    return meses[numeroMes - 1];
  }

  validateJornada(type:number){
    this.toggleRouteType = !this.toggleRouteType;
    // type === 1 ? this.listTransportations(1) : this.listTransportations(0)
  }
  validateRoutype(type:number){
    this.toggleTable = !this.toggleTable;
    type === 1 ? this.listTransportations(1) : this.listTransportations(0)
  }

}
