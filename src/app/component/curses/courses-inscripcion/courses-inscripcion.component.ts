import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CoursesService } from 'src/app/services/courses.service';
import { CurrencyUtils } from 'src/utils/currencyUtils';
import * as moment from 'moment';

//Avalpay
import { Avalpay } from 'src/utils/avalpay';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses-inscripcion',
  templateUrl: './courses-inscripcion.component.html',
  styleUrls: ['./courses-inscripcion.component.css']
})
export class CoursesInscripcionComponent implements OnInit {
  navTitle: any;
  cursoSelect: any;
  modalidadCursoSelect: any;
  listCourses: any;
  curso:any

  //Avalpay
  paymentData: object;
  moduleName: string;
  pmtId: any;
  descPagoAvalPay: string;
  public disableButton: boolean = true;
  showCourseCard: boolean;
  navigateTo: string;

  constructor ( 
    private coursesService:CoursesService,
    public currencyUtils: CurrencyUtils,
    //Avalpay
    public Avalpay: Avalpay,
    private route: ActivatedRoute) { 
    this.coursesService.listCourses().subscribe(response=>{
      this.listCourses = response.result
    },error=>{

    });

    //Avalpay
    this.paymentData = {};
    this.moduleName = 'cursos';
    this.descPagoAvalPay = 'CURSO';
    this.disableButton = true;
    this.navigateTo = 'inscripcion-cursos';

    this.showCourseCard = false;
  }

  ngOnInit(): void {
    this.navTitle = "Inscripción de cursos";
    this.curso = {id:'',typeCourse:'',starDate:'',finalDate:'',asignature:'',price:'',starHour:'',finalHour:'',description:'',courseAsTeacher:{name:''}}
    //Valida estado de matricula
    this.route.queryParams.subscribe(params => {
      if(params['pmtId']){
        this.pmtId = params['pmtId'];
        this.Avalpay.validateTransactions(this.pmtId, () => {
          // Pago de Cursos
          let lsCertificados:string = localStorage.getItem(`${this.moduleName}-transaction-status`) || '';
          let paymentAvalPay = JSON.parse(lsCertificados).data;
          this.coursesService.pagoInscripcion(paymentAvalPay).subscribe(response=>{},error=>{});
        },() => {},this.navigateTo, this.moduleName);
        
      }
    });
  }
  //AvalPay
  paymentAvalPayComponent(){
    this.Avalpay.paymentAvalPay(this.moduleName,this.paymentData, this.curso.price, 1, this.navigateTo, this.descPagoAvalPay)
  }
  changeSelect(){
    this.curso = this.listCourses.find((obj:any) => obj.id == this.cursoSelect)
    this.showCourseCard = true;
    this.disableButton = false;

    this.paymentData = {
      monto:this.curso.price,
      idCourse: this.curso.id,
      metodoPago: 'bolsillo',
      idEstudiante: localStorage.getItem('idEstudiante')
    }
  }
  formatFecha(fecha:any){
    return (moment(fecha).format('DD/MM/YYYY')==='Invalid date')?'':moment(fecha).format('DD/MM/YYYY')
  }
  pagarCurso(){
    if (this.cursoSelect) {
      Swal.fire({
        title: '¿Estas seguro que deseas pagar la matricula con la opción bolsillo?',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          if (Number(localStorage.getItem('bolsillo')) >= Number(this.curso.price)) {
            this.coursesService.pagoInscripcion(this.paymentData).subscribe(response=>{
              Swal.fire(response.mensaje, '', (response.status)?'success':'error')
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
