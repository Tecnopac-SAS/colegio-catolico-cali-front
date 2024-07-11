import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Course } from 'src/app/models/course.model';
import { CoursesService } from 'src/app/services/courses.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { CurrencyUtils } from 'src/utils/currencyUtils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses-create-extraordinaria',
  templateUrl: './courses-create-extraordinaria.component.html',
  styleUrls: ['./courses-create-extraordinaria.component.css']
})
export class CoursesCreateExtraordinariaComponent implements OnInit {

  course !: any;
  teacher !: any;
  navTitle = "cursos crear"
  public dataPension: any
  formValue!: FormGroup;
  formValueExtra!: FormGroup;
  courseModel: Course = new Course();
  public mensaje_ok: any;
  public mensaje_error: any;
  constructor(
    private formBuilder: FormBuilder,
    private coursesService: CoursesService,
    private teacherService: TeacherService,
    private currencyUtils: CurrencyUtils,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.idTeacherList()
    this.fieldCaptureExtra()

  }

  fieldCaptureExtra() {
    this.formValueExtra = this.formBuilder.group({
      asignature: [''],
      starDate: [''],
      finalDate: [''],
      price: [''],
      idTeacher: [''],
      typeCourse: [''],
      isActive: [''],
    })
  }

  CrearCourse() {
    this.courseModel.asignature = this.formValueExtra.value.asignature;
    this.courseModel.starDate = this.formValueExtra.value.starDate;
    this.courseModel.finalDate = this.formValueExtra.value.finalDate;
    this.courseModel.price = this.removeCurrencyFormat(this.formValueExtra.value.price);
    this.courseModel.idTeacher = this.formValueExtra.value.idTeacher;
    this.courseModel.typeCourse = "extraordinaria";
    this.courseModel.isActive = this.formValueExtra.value.isActive;

    if (this.courseModel.asignature == "") {
      this.mensaje_error = "El campo asignatura no puede estar vacio"
    }

    else if (this.courseModel.price <= 0) {
      this.mensaje_error = "El campo precio no puede estar vacio"
    }



    else {

      this.coursesService.createCourse(this.courseModel)
        .subscribe(res => {
          console.log(res);
          if (res.mensaje == "el curso ya existe") {
            this.mensaje_error = res.mensaje;
          }
          else {
            this.mensaje_ok = "Se registro correctamente"
            this.formValueExtra = this.formBuilder.group({
              asignature: [''],
              starDate: [''],
              finalDate: [''],
              price: [''],
              idTeacher: [''],
              typeCourse: [''],
              isActive: [''],
            })

            setTimeout(() => {
              this.router.navigate(['cursos-extraordinaria']);
            }, 1000);
          }
        },
          err => {
            console.log(err)
          })
    }
  }

  formatCurrency(amount: number): string {
    return '$ '+this.currencyUtils.formatCurrency(amount);
  }
  removeCurrencyFormat(inputValue: string): number {
    const numericValue = inputValue.replace(/[^\d.]/g, '');
    return parseFloat(numericValue);
  }

  formatCurrencyInput(event: any) {
    const inputElement = event.target;
    let value = inputElement.value;
    value = value.replace(/[^\d.]/g, '');
    let amount = parseFloat(value);
    if (!isNaN(amount)) {
      inputElement.value = this.formatCurrency(amount);
    }
  }




  idTeacherList() {
    this.teacherService.listTeachers()
      .subscribe(res => {
        this.teacher = res.result
        console.log(this.teacher)
      })

  }

  cerrarAlerta() {
    this.mensaje_error = ""
  }

}
