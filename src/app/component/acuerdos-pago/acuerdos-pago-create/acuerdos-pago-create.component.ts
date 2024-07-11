import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Certificate } from 'src/app/models/certificate.model';
import { AcuerdosPagos } from 'src/app/models/acuerdos-pagos.model';
import { acuerdosPagos } from 'src/app/services/acuerdos-pago.service';
import { AttendingManagementsService } from 'src/app/services/attending-managements.service';
import { StudentDatabaseService } from 'src/app/services/student-database.service';
import { Acudiente } from 'src/app/models/studentDatabase.model';
import { CurrencyUtils } from 'src/utils/currencyUtils';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'jquery';
import Swal from 'sweetalert2'

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
  matriculaAcudiente: any;
  pensionAcudiente: any;

  constructor(
    private formBuilder: FormBuilder,
    private attendingManagementsService: AttendingManagementsService,
    private acuerdosPagosService: acuerdosPagos,
    private StudentDatabaseService: StudentDatabaseService,
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
      service: [''],
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

      //Acuerdos de Pago por acudiente
      this.acuerdosPagosService.getAcuerdoPagoByAcudiente(this.id).subscribe(response => {
        this.acuerdosPagosAcudiente = response.result.length
        this.consecutivo = response.result.length + 1 || 1
      })

      this.acuerdosPagosService.getMatriculaAndPensionValue(1).subscribe(response => {
        this.matriculaAcudiente = response.result.matricula;
        this.pensionAcudiente = response.result.pension;
      })

      this.attendingManagementsService.obtenerAttendingManagement(this.id).subscribe(
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

          this.formValue.controls['fechaFirmado'].setValue(this.fechaActual)

          this.acuerdosPagosModel.idAcudiente = Number(this.id)

        }
      )
    })
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

    if(this.acuerdosPagosModel.description =="" ){
      this.mensaje_error="El campo descripción no puede estar vacío"
      return;
    }
    
    if(this.formValue.value.service =="" ){
      this.mensaje_error="El campo servicio no puede estar vacío"
      return;
    }
    if(this.pensionAcudiente.id == 0){
      this.mensaje_error="El acudiente puede tener estudiantes que no cuenten con ninguna pensión."
      return;
    }
    if(this.matriculaAcudiente.id == 0){
      this.mensaje_error="El acudiente puede tener estudiantes que no cuenten con ninguna matrícula."
      return;
    }


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
            service: [''],
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

  setDescription(event: any) {
    this.selectedService = event.target.value;
    let concept;
    if (this.selectedService == 'matricula') {
      concept = 'Matrícula'
      this.deudaTotal = this.matriculaAcudiente.valorMatricula;
      this.formValue.controls['valorTotalDeuda'].setValue(this.deudaTotal)
    } else {
      concept = 'Pensión'
      this.deudaTotal = this.pensionAcudiente.valorPension > 1 ? this.pensionAcudiente.valorPension : 10000;
      this.formValue.controls['valorTotalDeuda'].setValue(this.deudaTotal)
    }
    this.formValue.controls['description'].setValue(`Acuerdo de pago, concepto: ${concept}`)
  }

  formatCurrency(amount: number): string {
    return this.currencyUtils.formatCurrency(amount);
  }

  cerrarAlerta() {
    this.mensaje_error = ""
  }
}
