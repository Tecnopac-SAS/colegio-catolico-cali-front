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
  selector: 'app-acudiente-transportation',
  templateUrl: './acudiente-transportation.component.html',
  styleUrls: ['./acudiente-transportation.component.css']
})
export class AcudienteTransportationComponent implements OnInit {

  grade !: any;
  navTitle="Solicitúd de Transporte"
  formValue !:FormGroup
  public dataTransportation:any
  public dataTransportationRequests:any
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

  solicitarRuta(){
    this.transportationRequestService.listSolicitudesTransportes()
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
  

}
