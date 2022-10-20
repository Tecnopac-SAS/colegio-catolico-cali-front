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
  navTitle="Cursos extraordinario"
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

  // updatecourse(){

  //   this.courseModel.price= this.formValue.value.price;
  //   this.courseModel.discount= this.formValue.value.discount;
  //   this.courseModel.isActive= this.formValue.value.isActive;
  //   this.courseModel.idGrade= this.formValue.value.idGrade;



  //   if (this.courseModel.price==0) {

  //     Swal.fire(
  //       'El campo precio no puede estar vacio!',
  //       '',
  //       'warning'
  //      )
  //   }

  //   else if (this.courseModel.isActive==2) {

  //     Swal.fire(
  //       'El campo estado no puede estar vacio!',
  //       '',
  //       'warning'
  //      )
  //   }

  //   else {
  //     console.log(this.courseModel)
  //     this.courseService.updatecourse(this.courseModel.id,this.courseModel)
  //     .subscribe(res=>{

  //       Swal.fire(
  //         'Pensión actualizada!',
  //         '',
  //         'success'
  //        )
  //       this.listcourses()
  //     })
  //   }

  //   this.formValue = this.formBuilder.group({
  //     price: [''],
  //     idGrade: [''],
  //     use: [''],
  //     isActive:[''],
  //     discount:[''],
  //   })

  // }

}
