import { Component, OnInit } from '@angular/core';
import { ExtracurricularService } from 'src/app/services/extracurricular.service';
import { CurrencyUtils } from 'src/utils/currencyUtils';
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

  extracurricular:any
  constructor(
    private extracurricularService:ExtracurricularService,
    public currencyUtils: CurrencyUtils,
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

    this.extracurricularService.listExtracurriculares().subscribe(response=>{
      this.listExtracurriculares = response.result
    },error=>{

    });
   }

  ngOnInit(): void {
    this.navTitle = "Inscripciones a extracurriculares";
    this.extracurricular = {id:'',activity:'',startDate:'',finalDate:'',price:'',starHour:'',finalHour:'',description:'',extracurricularAsTeacher:{name:''}}
    //Valida estado de matricula
    this.route.queryParams.subscribe(params => {
      if(params['pmtId']){
        this.pmtId = params['pmtId'];
        this.Avalpay.validateTransactions(this.pmtId, () => {
          // Pago de Extracurricular
          let lsExtracurriculares:string = localStorage.getItem(`${this.moduleName}-transaction-status`) || '';
          let paymentAvalPay = JSON.parse(lsExtracurriculares).data;
          this.extracurricularService.pagoExtracurricular(paymentAvalPay).subscribe(response=>{});

        },() => {},this.navigateTo, this.moduleName);
        
      }
    });
  }

  //AvalPay
  paymentAvalPayComponent(){
    this.Avalpay.paymentAvalPay(this.moduleName,this.paymentData, this.extracurricular.price, 1, this.navigateTo, this.descPagoAvalPay)
  }

  changeSelect(){
    this.extracurricular = this.listExtracurriculares.find((obj:any) => obj.id == this.extracurricularSelect);
    this.showCourseCard = true;
    this.disableButton = false;
    
    this.paymentData = { 
      monto: this.extracurricular.price,
      idExtracurricular: this.extracurricular.id,
      metodoPago: 'bolsillo',
      idEstudiante: localStorage.getItem('idEstudiante'), 
      idAcudiente: localStorage.getItem('idAcudiente'),
      isActive: 1 
    };

  }
  formatFecha(fecha:any){
    return (moment(fecha).format('DD/MM/YYYY')==='Invalid date')?'':moment(fecha).format('DD/MM/YYYY')
  }
  pagar(){
    if (this.extracurricularSelect) {
      Swal.fire({
        title: '¿Estas seguro que deseas pagar el extracurricular con la opción bolsillo?',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          if (Number(localStorage.getItem('bolsillo')) >= Number(this.extracurricular.price)) {
            let datos = {monto:this.extracurricular.price,idExtracurricular:this.extracurricular.id,metodoPago:'bolsillo',idEstudiante:localStorage.getItem('idEstudiante'),isActive: 1}
            this.extracurricularService.pagoExtracurricular(this.paymentData).subscribe(response=>{
              Swal.fire(response.mensaje, '', (response.status)?'success':'error')
              if(response.status = 400){
                // window.location.reload();
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
