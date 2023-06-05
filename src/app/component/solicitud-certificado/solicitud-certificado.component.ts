import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CertificateService } from 'src/app/services/certificate.service';
import { PensionService } from 'src/app/services/pension.service';
import { CurrencyUtils } from 'src/utils/currencyUtils';
import * as moment from 'moment';
//Avalpay
import { Avalpay } from 'src/utils/avalpay';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-solicitud-certificado',
  templateUrl: './solicitud-certificado.component.html',
  styleUrls: ['./solicitud-certificado.component.css']
})
export class SolicitudCertificadoComponent implements OnInit {
  navTitle: any;
  canalSelect: any;
  certificateSelect: any;
  gradeSelect: any;
  listCertificate: any;
  listGrades:any
  certificate:any
  detalle:any

  //Avalpay
  paymentData: object;
  moduleName: string;
  pmtId: any;
  descPagoAvalPay: string;

  public disableButton: boolean = true;
  constructor(
      private certificateService:CertificateService,
      private pensionService:PensionService,
      public currencyUtils: CurrencyUtils,

      //Avalpay
      public Avalpay: Avalpay,
      private route: ActivatedRoute,) { 

      //Avalpay
      this.paymentData = {};
      this.moduleName = 'certificados';
      this.descPagoAvalPay = 'RECARGA BOLSILLO';
      this.disableButton = true;

      this.certificateService.listCertificatesAcu().subscribe(response=>{
        this.listCertificate = response.result
      },error=>{

    });
    this.pensionService.listGrades().subscribe(response=>{
      this.listGrades = response.result
    },error=>{

    });
  }

  ngOnInit(): void {
    this.navTitle = "Solicitud de certificados";
    this.certificate = {price:''}
        //Valida estado de matricula
        this.route.queryParams.subscribe(params => {
          if(params['pmtId']){
            this.pmtId = params['pmtId'];
            this.Avalpay.validateTransactions(this.pmtId, () => {
              // Pago de Certificados
              let lsCertificados:string = localStorage.getItem(`${this.moduleName}-transaction-status`) || '';
              let paymentAvalPay = JSON.parse(lsCertificados).data;
              this.certificateService.pagoInscripcion(paymentAvalPay).subscribe(response=>{});
              
            },() => {

              Swal.fire(
                'Certificado Solicitado!',
                'Comprueba el estado de la solicitud desde el modulo de estado de certificados',
                'success'
              ).then((result) => {
                window.location.reload();
              });

            },'solicitud-certificado', this.moduleName);
            
          }
        });
  }
  //AvalPay
  paymentAvalPayComponent(){
    this.paymentData = {
      monto:this.certificate.price,
      canalEntrega:this.canalSelect,
      detalle:this.detalle,
      idCertificate:this.certificateSelect,
      idGrade:this.gradeSelect,
      metodoPago:'bolsillo',
      idEstudiante:localStorage.getItem('idEstudiante')
    }
    this.Avalpay.paymentAvalPay(this.moduleName,this.paymentData, this.certificate.price, 1, this.descPagoAvalPay)
  }

  checkFields() {

    this.certificate = this.listCertificate.find((obj:any) => obj.id == this.certificateSelect)

    if (
      this.certificateSelect &&
      this.gradeSelect &&
      this.canalSelect &&
      this.detalle &&
      this.certificateSelect !== '' &&
      this.gradeSelect !== '' &&
      this.canalSelect !== '' &&
      this.detalle !== ''
    ) {
      // Todos los campos están llenos
      this.disableButton = false;
    } else {
      // Al menos uno de los campos está vacío
      this.disableButton = true;
    }
  }
  pagar(){
    if (this.certificateSelect) {
      Swal.fire({
        title: '¿Estas seguro que deseas pagar la matricula con la opcion bolsillo?',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          if (Number(localStorage.getItem('bolsillo')) >= Number(this.certificate.price)) {
            let datos = {
              monto:this.certificate.price,
              canalEntrega:this.canalSelect,
              detalle:this.detalle,
              idCertificate:this.certificateSelect,
              idGrade:this.gradeSelect,
              metodoPago:'bolsillo',
              idEstudiante:localStorage.getItem('idEstudiante')
            }
            this.certificateService.pagoInscripcion(datos).subscribe(response=>{
              // this.matricula = JSON.stringify(response.result)
              Swal.fire(response.mensaje, '', (response.status)?'success':'error')
              if (response.status) {
                this.canalSelect = ''
                this.certificateSelect = ''
                this.gradeSelect = ''
                this.detalle = ''
                this.certificate = {price:''}
              }
            },error=>{
  
            });
          }else{
            Swal.fire('Parece que no tienes fondos suficientes', 'Favor de ingresar fondos en el bolsillo', 'info')
          }
        }
      })
    }else{
      Swal.fire('Favor de seleccionar un curso', '', 'info')
    }
  }
}
