import { Component, OnInit } from '@angular/core';
import { SchoolYear } from 'src/app/models/schoolYear.model';
import { SchoolYearService } from 'src/app/services/school-year.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import Swal from'sweetalert2';

@Component({
  selector: 'app-school-year-index',
  templateUrl: './school-year-index.component.html',
  styleUrls: ['./school-year-index.component.css']
})
export class SchoolYearIndexComponent implements OnInit {

  grade !: any;
  navTitle="Año lectivo"
  formValue !:FormGroup
  public dataSchoolYear:any
  public filter:any;
  public filterText:any;
  SchoolYearModel:SchoolYear = new SchoolYear();
  id !: any;
  constructor(
    private formBuilder:FormBuilder,
    private SchoolYearService:SchoolYearService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.listSchoolYears()
    this.fieldCapture()
  }

  fieldCapture(){
    this.formValue = this.formBuilder.group({
      code: [''],
      age: [''],
    })
  }

  listSchoolYears(){
    this.SchoolYearService.listSchoolYears()
    .subscribe(res=>{
      this.dataSchoolYear=res.result
      console.log(this.dataSchoolYear)
    })
  }

  search(searchForm:any){

    if(this.filterText==""){
      this.listSchoolYears();
    }

    else {
      this.SchoolYearService.listSchoolYear(searchForm.value.filtro)
      .subscribe(res=>{
        this.dataSchoolYear=res.result
        console.log(res.result)
      })
    }

  }

  deshabilitar(data:any){
   this.SchoolYearModel.isActive = data.isActive
    if (data.isActive==0) {
      this.SchoolYearModel.isActive= 1;
      Swal.fire(
        'habilitado!',
        '',
        'success'
       )
    }

    else if (data.isActive=1) {
      this.SchoolYearModel.isActive= 0;
      Swal.fire(
        'deshabilitado!',
        '',
        'warning'
       )
    }
    this.SchoolYearService.deshabilitar(this.SchoolYearModel,data.id)
    .subscribe(res=>{
    this.listSchoolYears()
    })


  }

}
