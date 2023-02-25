import { Component, OnInit } from '@angular/core';
import { CafeteriaService } from 'src/app/services/cafeteria.service';
import { Cafeteria } from 'src/app/models/cateteria.model';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import Swal from'sweetalert2';
import { LoncheraService } from 'src/app/services/lonchera.service';
import * as moment from 'moment';

@Component({
  selector: 'app-cafereria-index',
  templateUrl: './cafereria-index.component.html',
  styleUrls: ['./cafereria-index.component.css']
})
export class CafereriaIndexComponent implements OnInit {

  grade !: any;
  navTitle="Cafeteria"
  formValue !:FormGroup
  public dataCafeteria:any
  public estudiantes:any
  public filter:any;
  public filterText:any;
  public filterTextEstudiante:any;
  cafeteriaModel:Cafeteria = new Cafeteria();
  id !: any;
  constructor(
    private formBuilder:FormBuilder,
    private CafeteriaService:CafeteriaService,
    private loncheraService:LoncheraService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.listCafeterias()
    this.fieldCapture()
    this.listEstudiantes()
  }

  fieldCapture(){
    this.formValue = this.formBuilder.group({
      routeName: [''],
      routeNumber: [''],
      responsible: [''],
      price:[''],
      isActive:['']

    })
  }

  listCafeterias(){
    this.CafeteriaService.listCafeterias()
    .subscribe(res=>{
      this.dataCafeteria=res.result
      console.log(this.dataCafeteria)
    })
  }
  listEstudiantes(){
    this.loncheraService.getPagos().subscribe(res=>{
      this.estudiantes=res.data
    })
  }

  search(searchForm:any){

    if(this.filterText==""){
      this.listCafeterias();
    }

    else {
      this.CafeteriaService.listCafeteria(searchForm.value.filtro)
      .subscribe(res=>{
        this.dataCafeteria=res.result
        console.log(res.result)
      })
    }

  }
  searchEstudiante(searchFormEstudiante:any){

    if(this.filterTextEstudiante==""){
      this.listEstudiantes();
    }else {
      this.loncheraService.listPagoSearch(searchFormEstudiante.value.filtro)
      .subscribe(res=>{
        this.estudiantes=res.data
      })
    }

  }

  deshabilitar(data:any){
   this.cafeteriaModel.isActive = data.isActive
    if (data.isActive==0) {
      this.cafeteriaModel.isActive= 1;
      Swal.fire(
        'habilitado!',
        '',
        'success'
       )
    }

    else if (data.isActive=1) {
      this.cafeteriaModel.isActive= 0;
      Swal.fire(
        'deshabilitado!',
        '',
        'warning'
       )
    }
    this.CafeteriaService.deshabilitar(this.cafeteriaModel,data.id)
    .subscribe(res=>{
    this.listCafeterias()
    })


  }
  entregarTarjeta(id:number){
    this.loncheraService.entregarTarjeta(id).subscribe(res=>{
      if(res.status){
        Swal.fire(res.message,'',(res.status)?'success':'error').then((resp)=>{
          if(resp.isConfirmed){
            location.reload()
          }
        })
      }
    })
  }
  formatFecha(fecha:any){
    return (moment(fecha).format('DD/MM/YYYY')==='Invalid date')?'':moment(fecha).format('DD/MM/YYYY')
  }
}
