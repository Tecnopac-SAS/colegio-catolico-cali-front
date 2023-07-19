import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';
import { Course } from 'src/app/models/course.model';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import Swal from'sweetalert2';

@Component({
  selector: 'app-courses-extraordinario',
  templateUrl: './courses-extraordinario.component.html',
  styleUrls: ['./courses-extraordinario.component.css']
})
export class CoursesExtraordinarioComponent implements OnInit {
  grade !: any;
  navTitle="Cursos y Nivelaciones"
  formValue !:FormGroup
  public dataCourse:any
  public filter:any;
  public filterText:any;
  courseModel:Course = new Course();
  constructor(
    private formBuilder:FormBuilder,
    private coursesService:CoursesService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.listcourses()
    this.fieldCapture()
  }

  fieldCapture(){
    this.formValue = this.formBuilder.group({
      price: [''],
      idGrade: [''],
      use: [''],
      isActive:[''],
      discount:[''],
    })
  }

  listcourses(){
    this.coursesService.listCourse("extraordinaria")
    .subscribe(res=>{
      this.dataCourse=res.result
      console.log(this.dataCourse)
    })
  }

  search(searchForm:any){

    if(this.filterText==""){
      this.listcourses();
    }

    else {
      this.coursesService.listAsignature(searchForm.value.filtro)
      .subscribe(res=>{
        this.dataCourse=res.result
        console.log(res.result)
      })
    }

  }

  editcourse(course:any){
    this.courseModel.id = course.id
    this.formValue.controls['idGrade'].setValue(course.idGrade)
    this.formValue.controls['price'].setValue(course.price)
    this.formValue.controls['discount'].setValue(course.discount)

    if (course.isActive==0) {
      this.formValue.controls['isActive'].setValue(0)

    } else {
      this.formValue.controls['isActive'].setValue(1)
    }

  }

  deshabilitar(data:any){
    this.courseModel.isActive = data.isActive
     if (data.isActive==0) {
       this.courseModel.isActive= 1;
       Swal.fire(
         'habilitado!',
         '',
         'success'
        )
     }
 
     else if (data.isActive=1) {
       this.courseModel.isActive= 0;
       Swal.fire(
         'deshabilitado!',
         '',
         'warning'
        )
     }
     this.coursesService.deshabilitar(this.courseModel,data.id)
     .subscribe(res=>{
     this.listcourses()
     })
 
 
   }

}
