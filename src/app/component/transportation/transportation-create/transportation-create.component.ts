import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Transportation } from 'src/app/models/transportation.model';
import { TransportationService } from 'src/app/services/transportation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transportation-create',
  templateUrl: './transportation-create.component.html',
  styleUrls: ['./transportation-create.component.css']
})
export class TransportationCreateComponent implements OnInit {

  Transportation !: any;
  navTitle="transporte crear"
  public dataTransporte:any
  formValue!: FormGroup;
  formValueExtra!: FormGroup;
  TransportationModel:Transportation= new Transportation();
  public mensaje_ok:any;
  public mensaje_error:any;
  constructor(
    private formBuilder:FormBuilder,
    private transportationService:TransportationService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.fieldCapture()

  }

  fieldCapture(){
    this.formValue = this.formBuilder.group({
      routeName: [''],
      routeNumber: [''],
      responsible: [''],
      price:[''],
      isActive:[''],
      routeType:[''],
    })
  }

  CrearTransportation(){
    this.TransportationModel.routeName = this.formValue.value.routeName;
    this.TransportationModel.routeNumber = this.formValue.value.routeNumber;
    this.TransportationModel.responsible = this.formValue.value.responsible;
    this.TransportationModel.price = this.formValue.value.price;
    this.TransportationModel.isActive = this.formValue.value.isActive;
    this.TransportationModel.routeType = this.formValue.value.routeType;

    if(this.TransportationModel.routeName =="" ){
      this.mensaje_error="El campo nombre de la ruta no puede estar vacio"
    }

    else if(this.TransportationModel.price  <=0 ){
      this.mensaje_error="El campo precio no puede estar vacio"
    }



    else{
      this.transportationService.createTransporte(this.TransportationModel)
      .subscribe(res=>{
      console.log(res);
        if (res.mensaje=="el tranposrte ya existe") {
          this.mensaje_error=res.mensaje;
        }
        else{
          this.mensaje_ok="Se registro correctamente"
          this.formValue = this.formBuilder.group({
            routeName: [''],
            routeNumber: [''],
            responsible: [''],
            price:[''],
            isActive:[''],
            routeType:[''],
          })
        }
      },
      err=>{
        console.log(err)
      })
    }
  }

  cerrarAlerta(){
    this.mensaje_error=""
  }

}
