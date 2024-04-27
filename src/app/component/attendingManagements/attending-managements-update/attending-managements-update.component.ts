import { Component, OnInit } from '@angular/core';
import { AttendingManagements } from 'src/app/models/attendingManagements.model';
import { Acudiente } from 'src/app/models/studentDatabase.model';
import { AttendingManagementsService } from 'src/app/services/attending-managements.service';
import { AcudienteService } from 'src/app/services/acudiente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import Swal from'sweetalert2'

@Component({
  selector: 'app-attending-managements-update',
  templateUrl: './attending-managements-update.component.html',
  styleUrls: ['./attending-managements-update.component.css']
})
export class AttendingManagementsUpdateComponent implements OnInit {
  attendingManagement !: any;
  navTitle="Editar Acudiente"
  public mensaje_ok:any;
  formValue!: FormGroup;
  public mensaje_error:any;
  id !: any;
  attendingManagementsModel:AttendingManagements = new AttendingManagements();
  acudienteModel: Acudiente = new Acudiente();
  
  constructor(
    private attendingManagementsService:AttendingManagementsService,
    private acudienteService:AcudienteService,
    private formBuilder:FormBuilder,
    private router:Router,
    private route : ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.fieldCapture()

  }

  fieldCapture(){
    this.formValue = this.formBuilder.group({
      nombres: [''],
      apellidos: [''],
      cargo:[''],
      celular:[''],
      correoElectronico:[''],
      direccion:[''],
      dondeTrabaja:[''],
      identificacion:[''],
      ingresoMensual:[''],
      parentesco:[''],
      vive:[''],
      profesion:[''],
      telefono:[''],
      tipoDocumento:[''],
    })
    this.fieldCaptureIndex()
  }

  fieldCaptureIndex(){
    this.route.params.subscribe(params=>{
      this.id = params['id'];
      this.attendingManagementsService.obtenerAttendingManagement(this.id).subscribe(
        response=>{
          this.attendingManagement= response
          console.log(this.attendingManagement)
          this.formValue.controls['nombres'].setValue(this.attendingManagement.result.nombres)
          this.formValue.controls['apellidos'].setValue(this.attendingManagement.result.apellidos)
          this.formValue.controls['cargo'].setValue(this.attendingManagement.result.cargo)
          this.formValue.controls['celular'].setValue(this.attendingManagement.result.celular)
          this.formValue.controls['correoElectronico'].setValue(this.attendingManagement.result.correoElectronico)
          this.formValue.controls['direccion'].setValue(this.attendingManagement.result.direccion)
          this.formValue.controls['dondeTrabaja'].setValue(this.attendingManagement.result.dondeTrabaja)
          this.formValue.controls['identificacion'].setValue(this.attendingManagement.result.identificacion)
          this.formValue.controls['ingresoMensual'].setValue(this.attendingManagement.result.ingresoMensual)
          this.formValue.controls['parentesco'].setValue(this.attendingManagement.result.parentesco)
          this.formValue.controls['vive'].setValue(this.attendingManagement.result.vive)
          this.formValue.controls['profesion'].setValue(this.attendingManagement.result.profesion)
          this.formValue.controls['telefono'].setValue(this.attendingManagement.result.telefono)
          this.formValue.controls['tipoDocumento'].setValue(this.attendingManagement.result.tipoDocumento)
          this.acudienteModel.idAcudiente = this.attendingManagement.result.id
          this.acudienteModel.idEstudiante = this.attendingManagement.result.idEstudiante
        }
      )
    })
  }

  actualizarAcudiente(){
    console.log(this.formValue.value)
    this.acudienteModel.nombres= this.formValue.value.nombres;
    this.acudienteModel.apellidos= this.formValue.value.apellidos;
    this.acudienteModel.cargo= this.formValue.value.cargo;
    this.acudienteModel.celular= this.formValue.value.celular;
    this.acudienteModel.correoElectronico= this.formValue.value.correoElectronico;
    this.acudienteModel.direccion= this.formValue.value.direccion;
    this.acudienteModel.dondeTrabaja= this.formValue.value.dondeTrabaja;
    this.acudienteModel.identificacion= this.formValue.value.identificacion;
    this.acudienteModel.ingresoMensual= this.formValue.value.ingresoMensual;
    this.acudienteModel.parentesco= this.formValue.value.parentesco;
    this.acudienteModel.profesion= this.formValue.value.profesion;
    this.acudienteModel.telefono= this.formValue.value.telefono;
    this.acudienteModel.vive= this.formValue.value.vive;
    this.acudienteModel.tipoDocumento= this.formValue.value.tipoDocumento;
    console.log(this.acudienteModel)

    console.log(this.id);
    this.acudienteService.actualizarAcudiente(this.acudienteModel)
    .subscribe(res=>{
      Swal.fire(
        'Datos actualizados!',
        '',
        'success'
       )
       setTimeout(() => {
          this.router.navigate(['gestion-acudiente']);
        }, 2000);
    })

  }



  cerrarAlerta(){
    this.mensaje_error=""
  }

}
