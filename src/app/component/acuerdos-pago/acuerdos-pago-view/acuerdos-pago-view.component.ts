import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Certificate } from 'src/app/models/certificate.model';
import { AcuerdosPagos } from 'src/app/models/acuerdos-pagos.model';
import { acuerdosPagos } from 'src/app/services/acuerdos-pago.service';
import { AttendingManagementsService } from 'src/app/services/attending-managements.service';
import { documentosService } from 'src/app/services/documentos.service';
import { StudentDatabaseService } from 'src/app/services/student-database.service';
import { Acudiente } from 'src/app/models/studentDatabase.model';
import { CurrencyUtils } from 'src/utils/currencyUtils';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'jquery';
import * as moment from 'moment';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-acuerdos-pago-view',
  templateUrl: './acuerdos-pago-view.component.html',
  styleUrls: ['./acuerdos-pago-view.component.css']
})
export class AcuerdosPagoViewComponent implements OnInit {

  acuerdosPagos !: any;
  id !: any;
  idAcudiente !: any;

  cuotas: number[] = [];
  dias: number[] = [];
  cuotasForm: FormGroup;
  selectedCuotas: number = 0;
  formValue!: FormGroup;

  navTitle = 'Ver Acuerdo de Pago'

  public dataTransporte: any

  public fechaActual: any;

  certificateModel: Certificate = new Certificate();
  acudienteModel: Acudiente = new Acudiente();
  acuerdosPagosModel: AcuerdosPagos = new AcuerdosPagos();

  public mensaje_ok: any;
  public mensaje_error: any;
  attendingManagements: any;
  selectedCuotasIguales: boolean = false;
  cuotasIgualesValorCuota: number = 10000;
  acuerdosPagosAcudiente: any;
  consecutivo: any;
  deudaTotal: number;
  selectedService: any;
  acuerdosPagosCuotas: any;
  documentData: any;
  acuerdoPago: any;

  constructor(
    private formBuilder: FormBuilder,
    private attendingManagementsService: AttendingManagementsService,
    private acuerdosPagosService: acuerdosPagos,
    private documentosService: documentosService,
    public currencyUtils: CurrencyUtils,
    private router: Router,
    private route: ActivatedRoute,
  ) {


    this.cuotasForm = this.formBuilder.group({
      cuotasArray: this.formBuilder.array([]) // Inicializa un FormArray vacío
    });
    this.deudaTotal = 10000
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
      description: [''],
      cuotasIguales: ['true'],
      cuotasIgualesCuotas: [1],
      cuotasIgualesFechaPago: [30],
    })
    this.fieldCaptureIndex()
  }

  fieldCaptureIndex() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.idAcudiente = params['idAcudiente'];

      this.acuerdosPagosService.getAcuerdoPago(this.id).subscribe(response => {
        this.acuerdoPago = response.result; 
        console.log(this.acuerdoPago);
        
        this.formValue.controls['consecutivoAcuerdo'].setValue(response.result.id)
        this.formValue.controls['description'].setValue(response.result.description)
        this.formValue.controls['fechaFirmado'].setValue(this.formatFecha(response.result.fecha))
        this.formValue.controls['valorTotalDeuda'].setValue(response.result.valor)
      })

      this.acuerdosPagosService.getAcuerdoPagoCuotas(this.id).subscribe(response => {
        this.acuerdosPagosCuotas = response.result;
      })

      //Acuerdos de Pago por acudiente
      this.acuerdosPagosService.getAcuerdoPagoByAcudiente(this.idAcudiente).subscribe(response => {
        this.acuerdosPagosAcudiente = response.result.length
        this.consecutivo = response.result.length + 1
      })

      this.attendingManagementsService.obtenerAttendingManagement(this.idAcudiente).subscribe(
        response => {
          this.attendingManagements = response
          this.formValue.controls['consecutivoAcuerdo'].setValue(this.consecutivo)
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

          this.acuerdosPagosModel.idAcudiente = Number(this.idAcudiente)

        }
      )
    })
  }

  descargaSoporte(){
    let filasTabla = '';
    this.acuerdosPagosCuotas.map((cuota: any) => {
      filasTabla += `
        <tr style="font-size: 13px;">
          <td style="font-size: 13px; text-align: center;">${cuota.id}</td>
          <td style="font-size: 13px; text-align: center;">${this.formatFecha(cuota.fechaPago)}</td>
          <td style="font-size: 13px; text-align: center; text-transform: capitalize;">$${this.formatCurrency(cuota.monto)}</td>
        </tr>`;
    });

    let tabla_cuotas = `
    <style>
          table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
          }
    </style>
      <table style="width: 95%; margin: auto; margin-top: 0.7rem;">
        <thead>
          <tr style="font-size: 16px; text-align: center;">
            <th>Cuota No.</th>
            <th>Fecha límite pago</th>
            <th>Valor cuota</th>
          </tr>
        </thead>
        <tbody>
          ${filasTabla}
        </tbody>
      </table>`;

    this.documentData = {
      consecutivoAcuerdo: this.acuerdoPago.consecutivoAcuerdo,
      nombresEstudiante: this.attendingManagements.result.acudienteAsEstudiante.nombres,
      apellidosEstudiante: this.attendingManagements.result.acudienteAsEstudiante.apellidos,
      codigoEstudiante: this.attendingManagements.result.acudienteAsEstudiante.codigo,
      grado: this.attendingManagements.result.acudienteAsEstudiante.grado,
      identificacionEstudiante: this.attendingManagements.result.acudienteAsEstudiante.identificacion,
      nombresAcudiente: this.attendingManagements.result.nombres,
      apellidosAcudiente: this.attendingManagements.result.apellidos,
      identificacionAcudiente: this.attendingManagements.result.identificacion,
      emailAcudiente: this.attendingManagements.result.correoElectronico,
      direccionAcudiente: this.attendingManagements.result.direccion,
      valorTotalDeuda: this.formatCurrency(this.acuerdoPago.valor),
      fechaFirmado: this.formatFecha(this.acuerdoPago.fecha),
      description: this.acuerdoPago.description,
      estado: this.acuerdoPago.estado,
      tabla_cuotas: tabla_cuotas,
    }
    this.documentosService.crearPDFDocumento(this.documentData, 9).subscribe(res => {
      window.location.href = res.pdfDownloadUrl;
    });
  }


  onSelectChange(event: any) {
    this.selectedCuotas = +event.target.value; // Obtiene el valor seleccionado y lo convierte a número
    this.cuotasIgualesValorCuota = Math.trunc(this.deudaTotal / this.selectedCuotas); // Calcula el valor de cada cuota
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
    this.acuerdosPagosModel.description = this.formValue.value.description;
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
          Swal.fire(
            'Acuerdo de Pago Creado con exito!',
            '',
            'success'
          );
          setTimeout(() => {
            this.router.navigate(['acuerdos-pago']);
          }, 2000);

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
            description: [''],
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

  formatFecha(fecha:any){
    return (moment(fecha).format('DD/MM/YYYY')==='Invalid date')?'':moment(fecha).format('YYYY-MM-DD')
  }

  cerrarAlerta() {
    this.mensaje_error = ""
  }
}