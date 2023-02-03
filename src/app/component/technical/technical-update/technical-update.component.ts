import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Technical } from 'src/app/models/technical.model';
import { TechnicalService } from 'src/app/services/technical.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher.service';
import Swal from'sweetalert2'

@Component({
  selector: 'app-technical-update',
  templateUrl: './technical-update.component.html',
  styleUrls: ['./technical-update.component.css']
})
export class TechnicalUpdateComponent implements OnInit {

  teacherData !: any;
  Technical !: any;
  navTitle="Editar media técnica"
  public dataTechnical:any
  formValue!: FormGroup;
  formValueExtra!: FormGroup;
  technicalModel:Technical= new Technical();
  public mensaje_ok:any;
  public mensaje_error:any;
  id !: any;
  constructor(
    private formBuilder:FormBuilder,
    private TechnicalService:TechnicalService,
    private teacherService:TeacherService,
    private router:Router,
    private route : ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.fieldCapture()
    this.idTeacherList()

  }

  fieldCapture(){
    this.formValue = this.formBuilder.group({
      course: [''],
      startDate: [''],
      finalDate:[''],
      price:[''],
      idTeacher:[''],
      starHour:[''],
      finalHour:[''],
      description:[''],
      isActive:['']
    })
    this.fieldCaptureIndex()
  }

  fieldCaptureIndex(){
    this.route.params.subscribe(params=>{
      this.id = params['id'];
      this.TechnicalService.obtenerTechnical(this.id).subscribe(
        response=>{
          this.Technical= response
          console.log(this.Technical)
          this.formValue.controls['course'].setValue(this.Technical.result.course)
          this.formValue.controls['startDate'].setValue(this.Technical.result.startDate)
          this.formValue.controls['finalDate'].setValue(this.Technical.result.finalDate)
          this.formValue.controls['price'].setValue(this.Technical.result.price)
          this.formValue.controls['idTeacher'].setValue(this.Technical.result.idTeacher)
          this.formValue.controls['isActive'].setValue(this.Technical.result.isActive)
          this.formValue.controls['starHour'].setValue(this.Technical.result.starHour)
          this.formValue.controls['finalHour'].setValue(this.Technical.result.finalHour)
          this.formValue.controls['description'].setValue(this.Technical.result.description)
          this.technicalModel.id = this.Technical.result.id
        }
      )
    })
  }

  actualizarTechnical(){
    console.log(this.formValue.value)
    this.technicalModel.course= this.formValue.value.course;
    this.technicalModel.startDate= this.formValue.value.startDate;
    this.technicalModel.finalDate= this.formValue.value.finalDate;
    this.technicalModel.price= this.formValue.value.price;
    this.technicalModel.idTeacher= this.formValue.value.idTeacher;
    this.technicalModel.isActive= this.formValue.value.isActive;
    this.technicalModel.starHour= this.formValue.value.starHour;
    this.technicalModel.finalHour= this.formValue.value.finalHour;
    this.technicalModel.description= this.formValue.value.description;
    console.log(this.technicalModel)

    if(this.technicalModel.course =="" ){
      this.mensaje_error="El campo curso no puede estar vacio"
    }

    else if(this.technicalModel.startDate  == "" ){
      this.mensaje_error="El campo fecha de inicio no puede estar vacio"
    }

    else if(this.technicalModel.finalDate  == "" ){
      this.mensaje_error="El campo fecha final no puede estar vacio"
    }

    else if(this.technicalModel.price  == "" ){
      this.mensaje_error="El campo precio no puede estar vacio"
    }

    else if(this.technicalModel.idTeacher  == 0 ){
      this.mensaje_error="El campo profesor no puede estar vacio"
    }
    else if(this.technicalModel.starHour  == '' ){
      this.mensaje_error="El campo inicio hora no puede estar vacio"
    }
    else if(this.technicalModel.finalHour  == '' ){
      this.mensaje_error="El campo fin hora no puede estar vacio"
    }
    else if(this.technicalModel.description  == '' ){
      this.mensaje_error="El campo descripción no puede estar vacio"
    }
    else {

    this.TechnicalService.updateTechnical(this.technicalModel,this.id)
    .subscribe(res=>{

      Swal.fire(
        'media tecnica actualizada!',
        'You clicked the button!',
        'success'
       )
       setTimeout(() => {
          this.router.navigate(['medias-tecnica']);
        }, 2000);
    })
   }
  }



  cerrarAlerta(){
    this.mensaje_error=""
  }

  idTeacherList(){
    this.teacherService.listTeachers()
    .subscribe(res=>{
      this.teacherData=res.result
      console.log(this.teacherData)
    })

  }

}
