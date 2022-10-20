import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Course } from 'src/app/models/course.model';
import { CoursesService } from 'src/app/services/courses.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import Swal from'sweetalert2';

@Component({
  selector: 'app-courses-update-verano',
  templateUrl: './courses-update-verano.component.html',
  styleUrls: ['./courses-update-verano.component.css']
})
export class CoursesUpdateVeranoComponent implements OnInit {

  course !: any;
  navTitle="cursos actualizar"
  public dataPension:any
  formValue!: FormGroup;
  courseModel:Course= new Course();
  public mensaje_ok:any;
  public mensaje_error:any;
  id !: any;
  constructor(
    private formBuilder:FormBuilder,
    private coursesService:CoursesService,
    private router:Router,
    private route : ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.fieldCaptureExtra()
  }

  fieldCaptureExtra(){
    this.formValue = this.formBuilder.group({
      asignature:[''],
      starDate: [''],
      finalDate: [''],
      price: [''],
      teacher: [''],
      typeCourse: [''],
      isActive: [''],
    })
    this.fieldCaptureIndex()
  }

  cerrarAlerta(){
    this.mensaje_error=""
  }

  fieldCaptureIndex(){
    this.route.params.subscribe(params=>{
      this.id = params['id'];
      this.coursesService.obtenerCurso(this.id).subscribe(
        response=>{
          this.course= response
          console.log(this.course.result)
          this.formValue.controls['asignature'].setValue(this.course.result.asignature)
          this.formValue.controls['starDate'].setValue(this.course.result.starDate)
          this.formValue.controls['finalDate'].setValue(this.course.result.finalDate)
          this.formValue.controls['price'].setValue(this.course.result.price)
          this.formValue.controls['teacher'].setValue(this.course.result.teacher)
          this.formValue.controls['typeCourse'].setValue(this.course.result.typeCourse)
          this.formValue.controls['isActive'].setValue(this.course.result.isActive)

          this.courseModel.id = this.course.result.id

          console.log("holaa " +this.courseModel.id)
          // this.productoService.obtenerCategoria().subscribe(
          //   response=>{
          //     this.categorias=response
          //     console.log(this.categorias)
          //   }
          // )

        }
      )
    })
  }

  actualizarCourse(){
    console.log(this.formValue.value)
    this.courseModel.asignature= this.formValue.value.asignature;
    this.courseModel.starDate= this.formValue.value.starDate;
    this.courseModel.finalDate= this.formValue.value.finalDate;
    this.courseModel.price= this.formValue.value.price;
    this.courseModel.teacher= this.formValue.value.teacher;
    this.courseModel.typeCourse= "extraordinaria";
    this.courseModel.isActive= this.formValue.value.isActive;
    console.log(this.courseModel)
    this.coursesService.updateCourse(this.courseModel,this.id)
    .subscribe(res=>{

      Swal.fire(
        'Curso actualizado!',
        'You clicked the button!',
        'success'
       )
       setTimeout(() => {
          this.router.navigate(['cursos-extraordinaria']);
        }, 2000);
    })


  }
}
