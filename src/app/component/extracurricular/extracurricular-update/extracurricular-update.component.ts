import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Extracurricular } from 'src/app/models/extracurricular.model';
import { ExtracurricularFile } from 'src/app/models/extracurricular.model';
import { ExtracurricularService } from 'src/app/services/extracurricular.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TeacherService } from 'src/app/services/teacher.service';
import Swal from'sweetalert2'
import * as moment from 'moment';


@Component({
  selector: 'app-extracurricular-update',
  templateUrl: './extracurricular-update.component.html',
  styleUrls: ['./extracurricular-update.component.css']
})
export class ExtracurricularUpdateComponent implements OnInit {

  teacherData !: any;
  public base_url = environment.url;
  navTitle="Editar extracurricular"
  Extracurricular !: any;
  public dataExtracurricular:any
  public imagenUrl:any
  formValue!: FormGroup;
  extracurricularModel:Extracurricular= new Extracurricular();
  public mensaje_ok:any;
  public mensaje_error:any;
  public file!: File;
  imageUrl !: any;
  id !: any;
  public imgSelect : String | ArrayBuffer | any;

  constructor(
    private formBuilder:FormBuilder,
    private extracurricularService:ExtracurricularService,
    private router:Router,
    private route : ActivatedRoute,
    private teacherService:TeacherService,
  ) {
    this.dataExtracurricular = []
  }

  ngOnInit(): void {
    this.fieldCaptureIndex()
    this.idTeacherList()
  }


  formatFecha(fecha:any){
    return (moment(fecha).format('YYYY-MM-DD')==='Invalid date')?'':moment(fecha).format('YYYY-MM-DD')
  }

  setImage(): void {
    this.imagenUrl = this.dataExtracurricular.imagen;
  }

  cerrarAlerta(){
    this.mensaje_error=""
  }

  fieldCaptureIndex(){
    this.route.params.subscribe(params=>{
      this.id = params['id'];
      this.extracurricularService.obtenerExtracurricular(this.id).subscribe(
        response=>{
          console.log(response);
          this.Extracurricular= response
          console.log('1',this.Extracurricular)
          console.log(this.Extracurricular.result.extracurricularAsTeacher.name)
          this.dataExtracurricular = new ExtracurricularFile(
            this.Extracurricular.result.imagen,
            this.Extracurricular.result.activity,
            this.formatFecha(this.Extracurricular.result.starDate),
            this.formatFecha(this.Extracurricular.result.finalDate),
            this.Extracurricular.result.extracurricularAsTeacher.id,
            this.Extracurricular.result.price,
            this.Extracurricular.result.information,
            this.Extracurricular.result.schedule);
            this.imgSelect=this.Extracurricular.result.imagen
         
        }
      )
    })
  }



  actualizarExtracurricular(extracurricularForm:any){

    this.extracurricularModel.imagen= extracurricularForm.value.imagen;
    this.extracurricularModel.activity= extracurricularForm.value.activity;
    this.extracurricularModel.startDate= extracurricularForm.value.startDate;
    this.extracurricularModel.finalDate= extracurricularForm.value.finalDate;
    this.extracurricularModel.idTeacher= extracurricularForm.value.idTeacher;
    this.extracurricularModel.price= extracurricularForm.value.price;
    this.extracurricularModel.information= extracurricularForm.value.information;
    this.extracurricularModel.schedule= extracurricularForm.value.schedule;

    console.log('--->', this.extracurricularModel)

    if(this.extracurricularModel.activity =="" ){
      this.mensaje_error="El campo actividad no puede estar vacio"
    }

    else if(this.extracurricularModel.startDate  == "" ){
      this.mensaje_error="El campo fecha de inicio no puede estar vacio"
    }

    else if(this.extracurricularModel.finalDate  == "" ){
      this.mensaje_error="El campo fecha final no puede estar vacio"
    }

    else if(this.extracurricularModel.idTeacher == 0 ){
      this.mensaje_error="El campo profesor no puede estar vacio"
    }

 
    else {
    this.extracurricularService.updateExtracurricular(this.extracurricularModel,this.id)
    .subscribe(res=>{

      Swal.fire(
        '¡Extracurricular actualizado!',
        '',
        'success'
       )
       setTimeout(() => {
          this.router.navigate(['extracurriculares']);
        }, 2000);
    })
   }
  }

  idTeacherList(){
    this.teacherService.listTeachers()
    .subscribe(res=>{
      this.teacherData=res.result
      console.log(this.teacherData)
    })

  }

}
