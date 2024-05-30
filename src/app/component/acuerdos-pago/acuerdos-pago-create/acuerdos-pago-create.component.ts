import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Certificate } from 'src/app/models/certificate.model';
import { AcuerdosPagos } from 'src/app/models/acuerdos-pagos.model';
import { acuerdosPagos } from 'src/app/services/acuerdos-pago.service';
import { AttendingManagementsService } from 'src/app/services/attending-managements.service';
import { Acudiente } from 'src/app/models/studentDatabase.model';
import { CurrencyUtils } from 'src/utils/currencyUtils';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'jquery';

@Component({
  selector: 'app-acuerdos-pago-create',
  templateUrl: './acuerdos-pago-create.component.html',
  styleUrls: ['./acuerdos-pago-create.component.css']
})
export class AcuerdosPagoCreateComponent implements OnInit {

  acuerdosPagos !: any;
  id !: any;


  cuotas: number[] = [];
  dias: number[] = [];
  cuotasForm: FormGroup;
  selectedCuotas: number = 0;
  formValue!: FormGroup;

  navTitle = 'Crear Acuerdos de Pago';
  public dataTransporte: any

  public fechaActual: any;

  certificateModel: Certificate = new Certificate();
  acudienteModel: Acudiente = new Acudiente();
  acuerdosPagosModel: AcuerdosPagos = new AcuerdosPagos();

  public mensaje_ok: any;
  public mensaje_error: any;
  attendingManagements: any;
  selectedCuotasIguales: boolean = false;
  cuotasIgualesValorCuota: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private attendingManagementsService: AttendingManagementsService,
    private acuerdosPagosService: acuerdosPagos,
    public currencyUtils: CurrencyUtils,
    private router: Router,
    private route: ActivatedRoute,
  ) {

    this.cuotas = Array.from({ length: 12 }, (_, i) => i + 1); // Crea un array de 1 a 12
    this.dias = Array.from({ length: 30 }, (_, i) => i + 1); // Crea un array de 1 a 12

    this.cuotasForm = this.formBuilder.group({
      cuotasArray: this.formBuilder.array([]) // Inicializa un FormArray vacío
    });

    this.fechaActual = new Date().toISOString().substring(0, 10)
  }

  ngOnInit(): void {
    this.fieldCapture()
  }

  fieldCapture() {
    this.formValue = this.formBuilder.group({
      consecutivoAcuerdo: [''],
      nombresEstudiante: [''],
      apellidosEstudiante: [''],
      codigoEstudiante: [''],
      grado: [''],
      identificacionEstudiante: [''],
      nombresAcudiente: [''],
      apellidosAcudiente: [''],
      tipoIdentificacionAcudiente: [''],
      identificacionAcudiente: [''],
      emailAcudiente: [''],
      direccionAcudiente: [''],
      valorTotalDeuda: [10000],
      fechaFirmado: [''],
      cuotasIguales: ['true'],
      cuotasIgualesCuotas: [1],
      cuotasIgualesFechaPago: [30],
    })
    this.fieldCaptureIndex()
  }

  fieldCaptureIndex() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.attendingManagementsService.obtenerAttendingManagement(this.id).subscribe(
        response => {
          this.attendingManagements = response
          console.log(this.attendingManagements)
          this.formValue.controls['consecutivoAcuerdo'].setValue('32')
          this.formValue.controls['nombresEstudiante'].setValue(this.attendingManagements.result?.acudienteAsEstudiante?.nombres)
          this.formValue.controls['apellidosEstudiante'].setValue(this.attendingManagements.result?.acudienteAsEstudiante?.apellidos)
          this.formValue.controls['codigoEstudiante'].setValue(this.attendingManagements.result?.acudienteAsEstudiante?.codigo)
          this.formValue.controls['grado'].setValue(this.attendingManagements.result?.acudienteAsEstudiante?.grado)
          this.formValue.controls['identificacionEstudiante'].setValue(this.attendingManagements.result?.acudienteAsEstudiante?.identificacion)

          this.formValue.controls['nombresAcudiente'].setValue(this.attendingManagements.result?.nombres)
          this.formValue.controls['apellidosAcudiente'].setValue(this.attendingManagements.result?.apellidos)
          this.formValue.controls['tipoIdentificacionAcudiente'].setValue(this.attendingManagements.result?.tipoDocumento)
          this.formValue.controls['identificacionAcudiente'].setValue(this.attendingManagements.result?.identificacion)
          this.formValue.controls['emailAcudiente'].setValue(this.attendingManagements.result?.correoElectronico)
          this.formValue.controls['direccionAcudiente'].setValue(this.attendingManagements.result?.direccion)

          this.formValue.controls['fechaFirmado'].setValue(this.fechaActual)

          this.acuerdosPagosModel.idAcudiente = Number(this.id)

        }
      )
    })
  }

  onSelectChange(event: any) {
    this.selectedCuotas = +event.target.value; // Obtiene el valor seleccionado y lo convierte a número
    this.cuotasIgualesValorCuota = Math.trunc(this.formValue.controls.valorTotalDeuda.value / this.selectedCuotas); // Calcula el valor de cada cuota
    if (event.target.id == 'cuotas') {
      this.updateCuotasArray();
    }
    if (event.target.id == 'cuotasIgualesCuotas') {
    }
  }

  updateCuotasArray() {
    const cuotasArray = this.cuotasForm.get('cuotasArray') as FormArray;
    cuotasArray.clear(); // Limpia el FormArray

    for (let i = 0; i < this.selectedCuotas; i++) {
      cuotasArray.push(this.formBuilder.group({
        valor: [{ value: `$  ${this.formatCurrency(this.cuotasIgualesValorCuota)}`, disabled: false }], // Campo para el valor de la cuota
        fecha: ['', Validators.required]
      }));
    }
  }

  get cuotasArray() {
    return this.cuotasForm.get('cuotasArray') as FormArray;
  }

  CrearAcuerdoPago() {

    this.acuerdosPagosModel.fecha = this.formValue.value.fechaFirmado;
    this.acuerdosPagosModel.description = `Acuerdo de Pago`;
    this.acuerdosPagosModel.valor = this.formValue.value.valorTotalDeuda;
    this.acuerdosPagosModel.estado = 'Pendiente';
    let cuotas: any = [];

    //Cuotas Iguales
    if (this.formValue.controls.cuotasIguales.value == 'true') {
      const cuotasIgualesCuotas: any = this.formValue.controls.cuotasIgualesCuotas.value;
      const cuotasIgualesFechaPago: any = this.formValue.controls.cuotasIgualesFechaPago.value;
      const valorTotalDeudaPorCuota: any = (this.formValue.controls.valorTotalDeuda.value / cuotasIgualesCuotas);
      const idAcuerdoPago: number = Number(this.formValue.controls.consecutivoAcuerdo.value);
      Array.from({ length: cuotasIgualesCuotas }).forEach((_, i) => {
        cuotas.push({
          cuota: i + 1,
          fechaPago: `${cuotasIgualesFechaPago}`,
          monto: valorTotalDeudaPorCuota,
          idAcuerdoPago: idAcuerdoPago
        });
      });
    }

    //Cuotas No Iguales
    if (this.formValue.controls.cuotasIguales.value === 'false') {
      const formValues = this.cuotasForm.value;
      this.cuotasArray.controls.forEach((control, index) => {
        if (!control.get('fecha')!.value) {
          this.mensaje_error = `El campo de fecha de la cuota ${index + 1} está vacío`;
          return;
        }
      });
      if (formValues && formValues.cuotasArray) {
        formValues.cuotasArray.forEach((cuota: any, index: any) => {
          const monto = Number(cuota.valor.replace('$', '').replace(/\s+/g, '').replace('.', ''));
          cuotas.push({
            cuota: index + 1,
            fechaPago: cuota.fecha,
            monto: monto,
            idAcuerdoPago: Number(this.formValue.controls.consecutivoAcuerdo.value)
          });
        });
      }
    }

    this.acuerdosPagosService.crearAcuerdoPago({ ...this.acuerdosPagosModel, cuotas: cuotas })
      .subscribe(response => {
        if (response.mensaje == "el dato ya existe") {
          this.mensaje_error = response.mensaje;
        } else {
          this.mensaje_ok = "Se registro correctamente"
          this.formValue = this.formBuilder.group({
            consecutivoAcuerdo: [''],
            nombresEstudiante: [''],
            apellidosEstudiante: [''],
            codigoEstudiante: [''],
            grado: [''],
            identificacionEstudiante: [''],
            nombresAcudiente: [''],
            apellidosAcudiente: [''],
            tipoIdentificacionAcudiente: [''],
            identificacionAcudiente: [''],
            emailAcudiente: [''],
            direccionAcudiente: [''],
            valorTotalDeuda: [''],
            fechaFirmado: [''],
            cuotasIguales: [''],
            cuotasIgualesCuotas: [''],
            cuotasIgualesFechaPago: [''],
          })
        }
      }, error => {
        console.log(error);
      });
  }

  formatCurrency(amount: number): string {
    return this.currencyUtils.formatCurrency(amount);
  }

  cerrarAlerta() {
    this.mensaje_error = ""
  }
}
