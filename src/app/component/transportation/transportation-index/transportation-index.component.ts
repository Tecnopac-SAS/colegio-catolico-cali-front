import { Component, OnInit } from '@angular/core';
import { TransportationService } from 'src/app/services/transportation.service';
import { TransportationRequestService } from 'src/app/services/transportationRequest.service';
import { Transportation } from 'src/app/models/transportation.model';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { CurrencyUtils } from 'src/utils/currencyUtils';

import Swal from'sweetalert2';

@Component({
  selector: 'app-transportation-index',
  templateUrl: './transportation-index.component.html',
  styleUrls: ['./transportation-index.component.css']
})
export class TransportationIndexComponent implements OnInit {

  grade !: any;
  navTitle="Transporte"
  formValue !:FormGroup
  public dataTransportation:any
  public dataTransportationRequests:any
  public filter:any;
  public filterText:any;
  public rutaObtenida:any;
  TransportationModel:Transportation = new Transportation();
  id !: any;
  constructor(
    private formBuilder:FormBuilder,
    private transportationService:TransportationService,
    public currencyUtils: CurrencyUtils,
    private transportationRequestService:TransportationRequestService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.listTransportations()
    this.listTransportationsRequests()
    this.fieldCapture()
  }

  fieldCapture(){
    this.formValue = this.formBuilder.group({
      routeName: [''],
      routeNumber: [''],
      responsible: [''],
      price:[''],
      isActive:['']

    })
  }

  listTransportations(){
    this.transportationService.listTransportes()
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

  search(searchForm:any){

    if(this.filterText==""){
      this.listTransportations();
    }

    else {
      this.transportationService.listTransporte(searchForm.value.filtro)
      .subscribe(res=>{
        this.dataTransportation=res.result
        console.log(res.result)
      })
    }

  }

  deshabilitar(data:any){
    this.TransportationModel.isActive = data.isActive
     if (data.isActive==0) {
       this.TransportationModel.isActive= 1;
       Swal.fire(
         'Transporte habilitado!',
         '',
         'success'
        )
     }
 
     else if (data.isActive=1) {
       this.TransportationModel.isActive= 0;
       Swal.fire(
         'Transporte deshabilitado!',
         '',
         'warning'
        )
     }
     this.transportationService.deshabilitar(this.TransportationModel,data.id)
     .subscribe(res=>{
     this.listTransportations()
     })
   }

   aprobarCupo(data: any) {
    Swal.fire({
      title: 'Confirmación',
      text: '¿Estás seguro de aprobar el cupo para el o los estudiantes asociados?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.transportationService.obtenerTransporte(data.routeid).subscribe(
          (res) => {
            this.rutaObtenida = res.result;
            console.log('dads', this.rutaObtenida);
  
            // Aquí mueve la lógica que depende de this.rutaObtenida dentro de la suscripción
            this.transportationRequestService.aprobarCupo({
              "estado": 0,
              "cupo": this.rutaObtenida.cupo_disponible - 1,
              "idruta": data.routeid
            }, data.id).subscribe(
              (res) => {
                Swal.fire({
                  title: 'Perfecto!',
                  text: 'Se realizó la modificación.',
                  icon: 'success',
                  confirmButtonColor: '#0891B2',
                });
                window.location.reload();
              },
              (error) => {
                // Manejo de errores en la solicitud de aprobación del cupo
              }
            );
          },
          (error) => {
            // Manejo de errores en la obtención de datos del transporte
          }
        );
      }
    });
  }
  

}
