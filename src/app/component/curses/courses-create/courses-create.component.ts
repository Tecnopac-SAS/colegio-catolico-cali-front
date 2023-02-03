import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Course } from 'src/app/models/course.model';
import { CoursesService } from 'src/app/services/courses.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses-create',
  templateUrl: './courses-create.component.html',
  styleUrls: ['./courses-create.component.css']
})
export class CoursesCreateComponent implements OnInit {

  course !: any;
  teacher !: any;
  navTitle="Cursos crear"
  public dataPension:any
  formValue!: FormGroup;
  formValueExtra!: FormGroup;
  courseModel:Course= new Course();
  public mensaje_ok:any;
  public mensaje_error:any;
  constructor(
    private formBuilder:FormBuilder,
    private coursesService:CoursesService,
    private teacherService:TeacherService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.teacherList()
    this.fieldCaptureExtra()

  }

  fieldCaptureExtra(){
    this.formValueExtra = this.formBuilder.group({
      asignature:[''],
      starDate: [''],
      finalDate: [''],
      price: [''],
      idTeacher: [''],
      typeCourse: [''],
      starHour: [''],
      finalHour: [''],
      description: [''],
      isActive: [''],
    })
  }

  CrearCourse(){
    this.courseModel.asignature = this.formValueExtra.value.asignature;
    this.courseModel.starDate = this.formValueExtra.value.starDate;
    this.courseModel.finalDate = this.formValueExtra.value.finalDate;
    this.courseModel.price = this.formValueExtra.value.price;
    this.courseModel.idTeacher = this.formValueExtra.value.idTeacher;
    this.courseModel.typeCourse = "verano";;
    this.courseModel.starHour = this.formValueExtra.value.starHour;
    this.courseModel.finalHour = this.formValueExtra.value.finalHour;
    this.courseModel.description = this.formValueExtra.value.description;
    this.courseModel.isActive = this.formValueExtra.value.isActive;

    if(this.courseModel.asignature =="" ){
      this.mensaje_error="El campo asignatura no puede estar vacio"
    }

    else if(this.courseModel.price  <=0 ){
      this.mensaje_error="El campo precio no puede estar vacio"
    }



    else{

      this.coursesService.createCourse(this.courseModel)
      .subscribe(res=>{
      console.log(res);
        if (res.mensaje=="el curso ya existe") {
          this.mensaje_error=res.mensaje;
        }
        else{
          this.mensaje_ok="Se registro correctamente"
          this.formValueExtra = this.formBuilder.group({
            asignature:[''],
            starDate: [''],
            finalDate: [''],
            price: [''],
            idTeacher: [''],
            typeCourse: [''],
            starHour: [''],
            finalHour: [''],
            description: [''],
            isActive: [''],
          })
        }
      },
      err=>{
        console.log(err)
      })
    }
  }


  teacherList(){
    this.teacherService.listTeachers()
    .subscribe(res=>{
      this.teacher=res.result
      console.log(this.teacher)
    })

  }

  cerrarAlerta(){
    this.mensaje_error=""
  }


}
