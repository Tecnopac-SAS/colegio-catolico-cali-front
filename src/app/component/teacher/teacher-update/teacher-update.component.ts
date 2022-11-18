import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Teacher } from 'src/app/models/teacher.model';
import { TeacherService } from 'src/app/services/teacher.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from'sweetalert2'

@Component({
  selector: 'app-teacher-update',
  templateUrl: './teacher-update.component.html',
  styleUrls: ['./teacher-update.component.css']
})
export class TeacherUpdateComponent implements OnInit {

  Teacher !: any;
  navTitle="Docente editar"
  public dataTeacher:any
  formValue!: FormGroup;
  formValueExtra!: FormGroup;
  teacherModel:Teacher= new Teacher();
  public mensaje_ok:any;
  public mensaje_error:any;
  id !: any;
  constructor(
    private formBuilder:FormBuilder,
    private teacherService:TeacherService,
    private router:Router,
    private route : ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.fieldCapture()

  }

  fieldCapture(){
    this.formValue = this.formBuilder.group({
      name: [''],
      course: [''],
      email: [''],
      isActive:[''],
      number: [''],
    })
    this.fieldCaptureIndex()
  }

  fieldCaptureIndex(){
    this.route.params.subscribe(params=>{
      this.id = params['id'];
      this.teacherService.obtenerTeacher(this.id).subscribe(
        response=>{
          this.Teacher= response
          console.log(this.Teacher)
          this.formValue.controls['name'].setValue(this.Teacher.result.name)
          this.formValue.controls['course'].setValue(this.Teacher.result.course)
          this.formValue.controls['email'].setValue(this.Teacher.result.email)
          this.formValue.controls['number'].setValue(this.Teacher.result.number)
          this.formValue.controls['isActive'].setValue(this.Teacher.result.isActive)
          this.teacherModel.id = this.Teacher.result.id
        }
      )
    })
  }

  actualizarTeacher(){
    console.log(this.formValue.value)
    this.teacherModel.name= this.formValue.value.name;
    this.teacherModel.course= this.formValue.value.course;
    this.teacherModel.email= this.formValue.value.email;
    this.teacherModel.number= this.formValue.value.number;
    this.teacherModel.isActive= this.formValue.value.isActive;
    console.log(this.teacherModel)
    this.teacherService.updateTeacher(this.teacherModel,this.id)
    .subscribe(res=>{

      Swal.fire(
        '¡Docente actualizado!',
        '',
        'success'
       )
       setTimeout(() => {
          this.router.navigate(['docente']);
        }, 2000);
    })


  }

  cerrarAlerta(){
    this.mensaje_error=""
  }

}
