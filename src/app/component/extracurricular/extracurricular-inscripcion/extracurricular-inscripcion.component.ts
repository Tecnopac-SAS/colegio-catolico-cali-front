import { Component, OnInit } from '@angular/core';
import { ExtracurricularService } from 'src/app/services/extracurricular.service';
import { CurrencyUtils } from 'src/utils/currencyUtils';

import { BolsilloService } from 'src/app/services/bolsillo.service';
import { SoportesPagosService } from 'src/app/services/soportes-pagos.service';

import Swal from 'sweetalert2';
import * as moment from 'moment';

//Avalpay
import { Avalpay } from 'src/utils/avalpay';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-extracurricular-inscripcion',
  templateUrl: './extracurricular-inscripcion.component.html',
  styleUrls: ['./extracurricular-inscripcion.component.css']
})
export class ExtracurricularInscripcionComponent implements OnInit {
  navTitle: any;
  extracurricularSelect: any;
  listExtracurriculares: any;

  //Avalpay
  paymentData: object;
  moduleName: string;
  pmtId: any;
  descPagoAvalPay: string;
  navigateTo: string;
  showCourseCard: boolean;
  disableButton: boolean;

  //Soportes de Pago
  paymentCode: any;

  extracurricular: any
  constructor(
    private extracurricularService: ExtracurricularService,
    public currencyUtils: CurrencyUtils,

    //Soportes de Pago
    public bolsilloService: BolsilloService,
    public soportesPagosService: SoportesPagosService,

    //Avalpay
    public Avalpay: Avalpay,
    private route: ActivatedRoute,
  ) {

    //Avalpay
    this.paymentData = {};
    this.moduleName = 'extracurricular';
    this.descPagoAvalPay = 'EXTRACURRICULAR';
    this.navigateTo = 'extracurricular-inscripcion';
    this.showCourseCard = false;
    this.disableButton = true;

    //Soportes de Pago
    this.paymentCode;

    this.extracurricularService.listExtracurriculares().subscribe(response => {
      this.listExtracurriculares = response.result
    }, error => {

    });
  }

  ngOnInit(): void {

    //Soportes de Pago
    this.paymentCode = [...Array(8)].map(() => (~~(Math.random() * 36)).toString(36)).join('');

    this.navTitle = "Inscripciones a extracurriculares";
    this.extracurricular = { id: '', activity: '', startDate: '', finalDate: '', price: '', starHour: '', finalHour: '', description: '', extracurricularAsTeacher: { name: '' } }
    //Valida estado de matricula
    this.route.queryParams.subscribe(params => {
      if (params['pmtId']) {
        this.pmtId = params['pmtId'];
        this.Avalpay.validateTransactions(this.pmtId, () => {
          // Pago de Extracurricular
          let lsExtracurriculares: string = localStorage.getItem(`${this.moduleName}-transaction-status`) || '';
          let paymentAvalPay = JSON.parse(lsExtracurriculares).data;
          this.extracurricularService.pagoExtracurricular(paymentAvalPay).subscribe(response => { });

        }, () => { }, this.navigateTo, this.moduleName);

      }
    });
  }

  //AvalPay
  paymentAvalPayComponent() {
    this.Avalpay.paymentAvalPay(this.moduleName, this.paymentData, this.extracurricular.price, 1, this.navigateTo, this.descPagoAvalPay)
  }

  changeSelect() {
    this.extracurricular = this.listExtracurriculares.find((obj: any) => obj.id == this.extracurricularSelect);
    this.showCourseCard = true;
    this.disableButton = false;

    this.paymentData = {
      monto: this.extracurricular.price,
      idExtracurricular: this.extracurricular.id,
      metodoPago: 'bolsillo',
      idEstudiante: localStorage.getItem('idEstudiante'),
      idAcudiente: localStorage.getItem('idAcudiente'),
      isActive: 1,
      paymentCode: this.paymentCode
    };

  }
  formatFecha(fecha: any) {
    return (moment(fecha).format('DD/MM/YYYY') === 'Invalid date') ? '' : moment(fecha).format('DD/MM/YYYY')
  }
  pagar() {
    if (this.extracurricularSelect) {
      Swal.fire({
        title: '¿Estas seguro que deseas pagar la extracurricular con la opción bolsillo?',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          if (Number(localStorage.getItem('bolsillo')) >= Number(this.extracurricular.price)) {

            //Descuento bolsillo
            this.bolsilloService.descuento({ idAcudiente: localStorage.getItem('idAcudiente'), cant: this.extracurricular.price }).subscribe(response => { });

            let datos = { monto: this.extracurricular.price, idExtracurricular: this.extracurricular.id, metodoPago: 'bolsillo', idEstudiante: localStorage.getItem('idEstudiante'), isActive: 1 }
            this.extracurricularService.pagoExtracurricular(this.paymentData).subscribe(response => {
              if (response.status) {
                //Soportes De Pago
                let soportePagoData = {
                  paymentCode: this.paymentCode,
                  idAcudiente: localStorage.getItem('idAcudiente'),
                  tipoPago: 'Extracurricular',
                  viaPago: 'Bolsillo',
                  monto: this.extracurricular.price
                }
                this.soportesPagosService.crearSoportePago(soportePagoData).subscribe(response => { });
              }
              Swal.fire({
                icon: response.status ? 'success' : 'error',
                title: response.mensaje,
                showCancelButton: true,
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                } else if (result.isDenied) { }
              });
            }, error => {

            });
          } else {
            Swal.fire('Parece que no tienes fondos suficientes', 'Favor de ingresar fondos en el bolsillo', 'info')
          }
        }
      })
    } else {
      Swal.fire('Favor de seleccionar un curso', '', 'info')
    }
  }
}
