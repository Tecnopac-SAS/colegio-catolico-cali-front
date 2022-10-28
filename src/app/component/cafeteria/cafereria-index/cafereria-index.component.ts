import { Component, OnInit } from '@angular/core';
import { CafeteriaService } from 'src/app/services/cafeteria.service';
import { Cafeteria } from 'src/app/models/cateteria.model';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import Swal from'sweetalert2';

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
  public filter:any;
  public filterText:any;
  cafeteriaModel:Cafeteria = new Cafeteria();
  id !: any;
  constructor(
    private formBuilder:FormBuilder,
    private CafeteriaService:CafeteriaService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.listCafeterias()
    this.fieldCapture()
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

}
