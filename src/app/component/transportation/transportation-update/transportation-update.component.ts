import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Transportation } from 'src/app/models/transportation.model';
import { TransportationService } from 'src/app/services/transportation.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from'sweetalert2'

@Component({
  selector: 'app-transportation-update',
  templateUrl: './transportation-update.component.html',
  styleUrls: ['./transportation-update.component.css']
})
export class TransportationUpdateComponent implements OnInit {

  transportation !: any;
  navTitle="transporte editar"
  public dataTransporte:any
  formValue!: FormGroup;
  formValueExtra!: FormGroup;
  transportationModel:Transportation= new Transportation();
  public mensaje_ok:any;
  public mensaje_error:any;
  id !: any;
  constructor(
    private formBuilder:FormBuilder,
    private transportationService:TransportationService,
    private router:Router,
    private route : ActivatedRoute,
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
    this.fieldCaptureIndex()
  }

  fieldCaptureIndex(){
    this.route.params.subscribe(params=>{
      this.id = params['id'];
      this.transportationService.obtenerTransporte(this.id).subscribe(
        response=>{
          this.transportation= response
          console.log(this.transportation)
          this.formValue.controls['routeName'].setValue(this.transportation.result.routeName)
          this.formValue.controls['routeNumber'].setValue(this.transportation.result.routeNumber)
          this.formValue.controls['responsible'].setValue(this.transportation.result.responsible)
          this.formValue.controls['price'].setValue(this.transportation.result.price)
          this.formValue.controls['routeType'].setValue(this.transportation.result.routeType)
          this.formValue.controls['isActive'].setValue(this.transportation.result.isActive)
          this.transportationModel.id = this.transportation.result.id
          console.log("holaa " +this.transportationModel.id)

        }
      )
    })
  }

  actualizarTransporte(){
    console.log(this.formValue.value)
    this.transportationModel.routeName= this.formValue.value.routeName;
    this.transportationModel.routeNumber= this.formValue.value.routeNumber;
    this.transportationModel.responsible= this.formValue.value.responsible;
    this.transportationModel.price= this.formValue.value.price;
    this.transportationModel.routeType= this.formValue.value.routeType;
    this.transportationModel.isActive= this.formValue.value.isActive;
    console.log(this.transportationModel)
    this.transportationService.updateTransporte(this.transportationModel,this.id)
    .subscribe(res=>{

      Swal.fire(
        '¡Transporte actualizado!',
        '',
        'success'
       )
       setTimeout(() => {
          this.router.navigate(['transporte']);
        }, 1000);
    })


  }



  cerrarAlerta(){
    this.mensaje_error=""
  }


}
