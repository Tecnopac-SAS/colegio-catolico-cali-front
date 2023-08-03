import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { TransportationRequests } from 'src/app/models/transportation-requests.model';
import { TransportationRequestService } from 'src/app/services/transportationRequest.service';
import { TransportationService } from 'src/app/services/transportation.service';
import { StudentDatabaseService } from 'src/app/services/student-database.service';
import { Router } from '@angular/router';
import { CurrencyUtils } from 'src/utils/currencyUtils';
import * as moment from 'moment';

@Component({
  selector: 'app-acudiente-transportation-create',
  templateUrl: './acudiente-transportation-create.component.html',
  styleUrls: ['./acudiente-transportation-create.component.css']
})
export class AcudienteTransportationCreateComponent implements OnInit {

  Transportation !: any;
  navTitle="Solicitúd de Transporte"
  public dataTransporte:any
  public rutas: any;
  public acudiente: any;
  public rutaCargada: any;
  formValue!: FormGroup;
  formValueExtra!: FormGroup;
  TransportationRequests:TransportationRequests= new TransportationRequests();
  public mensaje_ok:any;
  public mensaje_error:any;
  estudiantesAsociados: any;
  constructor(
    private formBuilder:FormBuilder,
    private transportationRequestService:TransportationRequestService,
    private transportationService:TransportationService,
    private StudentDatabaseService:StudentDatabaseService,
    public currencyUtils: CurrencyUtils,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.fieldCapture()
    this.getRutas();
    this.getEstudiantes();
    this.acudiente = localStorage.getItem('idAcudiente');
    this.rutaCargada = [
      {
          "id": 1,
          "routeName": "Selecciona Ruta",
          "routeNumber": "1",
          "responsible": "Selecciona Ruta",
          "price": 0,
          "cupo_disponible": 0,
      }
  ]
  }

  getRutas(){
    this.transportationService.listTransportes()
    .subscribe(res=>{
      this.rutas=res.result
      console.log(this.rutas);
    })
  }
  formatFecha(fecha:any){
    return (moment(fecha).format('DD/MM/YYYY')==='Invalid date')?'':moment(fecha).format('YYYY-MM-DD')
  }
  getEstudiantes(){
      this.StudentDatabaseService.obtenerStudentDatabase(Number(localStorage.getItem('idEstudiante'))).subscribe(
        (res:any)=>{
          this.estudiantesAsociados= [res.result];
          console.log(this.estudiantesAsociados);
        }
      )
  }

  cargaRuta(event: Event): void{
    let selectRoute: HTMLInputElement = event.target as HTMLInputElement;
    let inputValue: any = selectRoute.value;
    this.transportationService.obtenerTransporte(parseInt(inputValue))
    .subscribe(res=>{
      this.rutaCargada=[res.result]
    })
  }

  fieldCapture(){
    this.formValue = this.formBuilder.group({
      routeid: [''],
      acudienteid: [''],
      estudianteid: [''],
      estado:[''],
      direccion_recogida:[''],
      direccion_entrega:[''],
    })
  }

  CrearTransportation(){

    this.TransportationRequests.routeid = this.formValue.value.routeid;
    this.TransportationRequests.acudienteid = this.acudiente;
    this.TransportationRequests.estudianteid = this.formValue.value.estudianteid;
    this.TransportationRequests.estado = 1;
    this.TransportationRequests.direccion_recogida = this.formValue.value.direccion_recogida;
    this.TransportationRequests.direccion_entrega = this.formValue.value.direccion_entrega;


    if(this.TransportationRequests.routeid == 0 ){
      this.mensaje_error="El campo nombre de la ruta no puede estar vacio"
    }

    else{
      this.transportationRequestService.createTransporteSolicitud(this.TransportationRequests)
      .subscribe(res=>{
      console.log(res);
        if (res.mensaje=="el tranporte ya existe") {
          this.mensaje_error=res.mensaje;
        }
        else{
          this.mensaje_ok="Se registro correctamente"
          this.formValue = this.formBuilder.group({
            routeid: [''],
            acudienteid: [''],
            estudianteid: [''],
            estado:[''],
            direccion_recogida:[''],
            direccion_entrega:[''],
          })

          setTimeout(() => {
            this.router.navigate(['acudiente-transporte']);
          }, 1000);
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
