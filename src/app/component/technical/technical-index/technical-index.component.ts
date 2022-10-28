import { Component, OnInit } from '@angular/core';
import { Technical } from 'src/app/models/technical.model';
import { TechnicalService } from 'src/app/services/technical.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import Swal from'sweetalert2';

@Component({
  selector: 'app-technical-index',
  templateUrl: './technical-index.component.html',
  styleUrls: ['./technical-index.component.css']
})
export class TechnicalIndexComponent implements OnInit {

  grade !: any;
  navTitle="Tecnicas"
  formValue !:FormGroup
  public dataTechnical:any
  public filter:any;
  public filterText:any;
  technicalModel:Technical = new Technical();
  id !: any;
  constructor(
    private formBuilder:FormBuilder,
    private TechnicalService:TechnicalService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.listTechnicals()
    this.fieldCapture()
  }

  fieldCapture(){
    this.formValue = this.formBuilder.group({
      course: [''],
      startDate: [''],
      finalDate:[''],
      price:[''],
      teacher:[''],
      isActive:['']

    })
  }

  listTechnicals(){
    this.TechnicalService.listTechnicals()
    .subscribe(res=>{
      this.dataTechnical=res.result
      console.log(this.dataTechnical)
    })
  }

  search(searchForm:any){

    if(this.filterText==""){
      this.listTechnicals();
    }

    else {
      this.TechnicalService.listTechnical(searchForm.value.filtro)
      .subscribe(res=>{
        this.dataTechnical=res.result
        console.log(res.result)
      })
    }

  }

  deshabilitar(data:any){
   this.technicalModel.isActive = data.isActive
    if (data.isActive==0) {
      this.technicalModel.isActive= 1;
      Swal.fire(
        'habilitado!',
        '',
        'success'
       )
    }

    else if (data.isActive=1) {
      this.technicalModel.isActive= 0;
      Swal.fire(
        'deshabilitado!',
        '',
        'warning'
       )
    }
    this.TechnicalService.deshabilitar(this.technicalModel,data.id)
    .subscribe(res=>{
    this.listTechnicals()
    })


  }

}
