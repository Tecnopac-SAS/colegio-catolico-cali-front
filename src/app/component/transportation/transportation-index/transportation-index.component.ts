import { Component, OnInit } from '@angular/core';
import { TransportationService } from 'src/app/services/transportation.service';
import { Transportation } from 'src/app/models/transportation.model';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
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
  public filter:any;
  public filterText:any;
  TransportationModel:Transportation = new Transportation();
  id !: any;
  constructor(
    private formBuilder:FormBuilder,
    private transportationService:TransportationService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.listTransportations()
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

}
