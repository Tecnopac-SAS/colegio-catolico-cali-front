import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CafeteriaService } from 'src/app/services/cafeteria.service';
import { LoncheraService } from 'src/app/services/lonchera.service';
import { CurrencyUtils } from 'src/utils/currencyUtils';

import { BolsilloService } from 'src/app/services/bolsillo.service';
import { SoportesPagosService } from 'src/app/services/soportes-pagos.service';

//Avalpay
import { Avalpay } from 'src/utils/avalpay';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cafeteria-pago',
  templateUrl: './cafeteria-pago.component.html',
  styleUrls: ['./cafeteria-pago.component.css']
})
export class CafeteriaPagoComponent implements OnInit {
  navTitle: any;
  menuSelect: any;
  listMenu: any;
  menu: any
  productMenu: any
  cantMenu: any
  cant: number
  lonchera: any

  //Avalpay
  paymentData: object;
  moduleName: string;
  pmtId: any;
  descPagoAvalPay: string;
  public disableButton: boolean = true;
  navigateTo: string;

  //Soportes de Pago
  paymentCode: any;

  constructor(private cafeteriaService: CafeteriaService,
    //Avalpay
    public Avalpay: Avalpay,
    private route: ActivatedRoute,

    //Soportes de Pago
    public bolsilloService: BolsilloService,
    public soportesPagosService: SoportesPagosService,

    public currencyUtils: CurrencyUtils,
    private loncheraService: LoncheraService) {

    //Avalpay
    this.paymentData = {};
    this.moduleName = 'cafeteria';
    this.descPagoAvalPay = 'RECARGA CAFETERIA';
    this.navigateTo = 'cafeteria-pago'
    this.disableButton = true;

    this.cant = 0
    this.cafeteriaService.listCafeterias().subscribe(response => {
      this.listMenu = response.result
    }, error => {

    });
  }

  ngOnInit(): void {


    //Soportes de Pago
    this.paymentCode = [...Array(8)].map(() => (~~(Math.random() * 36)).toString(36)).join('');

    this.navTitle = "Cafeteria";
    //Valida estado de matricula
    this.route.queryParams.subscribe(params => {
      if (params['pmtId']) {
        this.pmtId = params['pmtId'];
        this.Avalpay.validateTransactions(this.pmtId, () => {
          // Pago de Cafeteria
          let lsCertificados: string = localStorage.getItem(`${this.moduleName}-transaction-status`) || '';
          let paymentAvalPay = JSON.parse(lsCertificados).data;
          this.loncheraService.pagar(paymentAvalPay, localStorage.getItem('idAcudiente'), localStorage.getItem('idEstudiante')).subscribe(response => { });
        }, () => { }, this.navigateTo, this.moduleName);

      }
    });
  }
  //AvalPay
  paymentAvalPayComponent() {
    this.Avalpay.paymentAvalPay(this.moduleName, this.paymentData, this.cant, 1, this.navigateTo, this.descPagoAvalPay)
  }
  changeSelect() {
    if (this.menuSelect && this.cantMenu) {
      let menu = this.listMenu.find((obj: any) => obj.id == this.menuSelect)
      this.cant = Number(menu.pay) * Number(this.cantMenu)
      this.productMenu = menu.description
      this.disableButton = false;
    }
    this.paymentData = { cant: this.cant, cantMenu: this.cantMenu, productMenu: this.productMenu, metodoPago: 'bolsillo', paymentCode: this.paymentCode }
  }
  pagar() {
    if (this.cant) {
      Swal.fire({
        title: '¿Estas seguro que deseas dinero a tu lonchera con la opción bolsillo?',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          if (Number(localStorage.getItem('bolsillo')) >= Number(this.cant)) {

            //Descuento bolsillo
            this.bolsilloService.descuento({ idAcudiente: localStorage.getItem('idAcudiente'), cant: this.cant }).subscribe(response => { });

            this.loncheraService.pagar(this.paymentData, localStorage.getItem('idAcudiente'), localStorage.getItem('idEstudiante')).subscribe(response => {

              //Soportes De Pago
              let soportePagoData = {
                paymentCode: this.paymentCode,
                idAcudiente: localStorage.getItem('idAcudiente'),
                tipoPago: 'Cafetería',
                viaPago: 'Bolsillo',
                monto: this.cant
              }
              this.soportesPagosService.crearSoportePago(soportePagoData).subscribe(response => { });
              Swal.fire({
                icon: response.status ? 'success' : 'error',
                title: response.mensaje,
                showCancelButton: true,
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                } else if (result.isDenied) { }
              });
              if (response.status) {
                this.cant = 0
                this.menuSelect = ''
                this.cantMenu = ''
              }
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
