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
  ) {}

  ngOnInit(): void {
    this.fieldCaptureIndex()
    this.idTeacherList()
  }

  onSubmit(extracurricularForm:any){
    if(extracurricularForm.valid){
      if (this.file!=this.imgSelect) {
        this.extracurricularService.createExtracurricularFile({
          imagen: this.file,
          startDate: extracurricularForm.value.startDate,
          finalDate: extracurricularForm.value.finalDate,
          activity: extracurricularForm.value.activity,
          idTeacher: extracurricularForm.value.idTeacher,
          price: extracurricularForm.value.price,
          information: extracurricularForm.value.information,
          schedule: extracurricularForm.value.schedule,
          isActive: extracurricularForm.value.isActive,

        }).subscribe(
          response =>{
           this.mensaje_ok = 'la información se registro  correctamente';
           this.dataExtracurricular = new ExtracurricularFile('','','','',0,0,'','');
           this.imgSelect = '../../../../assets/img/default.jpg';
           this.imageUrl=""
           this.file=this.imgSelect;
          },
          error=>{

          }
        );

      }

      else{
        this.mensaje_error = 'Favor cargue una imagen';

      }

    }else{
      this.mensaje_error = 'Complete correctamente el formulario';

    }
  }

  cerrarAlerta(){
    this.mensaje_error=""
  }

  imageSelect(event: any){
    if(event.target.files  && event.target.files[0]){
        this.file = <File>event.target.files[0];
        const reader = new FileReader();
        reader.onload = e => this.imgSelect= reader.result;
        reader.readAsDataURL(this.file);
        console.log("soy el file " +this.file)
        console.log("soy el file " +this.file.name)
    }
    this.base_url=""
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
            "",
            this.Extracurricular.result.activity,
            this.Extracurricular.result.starDate,
            this.Extracurricular.result.finalDate,
            this.Extracurricular.result.extracurricularAsTeacher.id,
            this.Extracurricular.result.price,
            this.Extracurricular.result.information,
            this.Extracurricular.result.schedule);
            this.imgSelect=this.Extracurricular.result.imagen
         console.log(this.dataExtracurricular);
         
        }
      )
    })
  }


  // actualizarExtracurricular(extracurricularForm:any){

  //   this.extracurricularService.updateExtracurricular({
  //     imagen: this.file,
  //     id: this.id,
  //     startDate: extracurricularForm.value.startDate,
  //     finalDate: extracurricularForm.value.finalDate,
  //     activity: extracurricularForm.value.activity,
  //     idTeacher: extracurricularForm.value.idTeacher,
  //     price: extracurricularForm.value.price,
  //     information: extracurricularForm.value.information,
  //     schedule: extracurricularForm.value.schedule,
    
  
  //   }).subscribe(
  //     response =>{
  //      this.mensaje_ok = 'la información se registro  correctamente';
  //      this.dataExtracurricular = new ExtracurricularFile('','','','',0,0,'','');
  //      this.imgSelect = '../../../../assets/img/default.jpg';
  //      this.imageUrl=""
  //      this.file=this.imgSelect;
  //     },
  //     error=>{
  
  //     }
  //   );

  // }
  actualizarExtracurricular(extracurricularForm:any){

    this.extracurricularModel.imagen= "this.file";
    this.extracurricularModel.activity= extracurricularForm.value.activity;
    this.extracurricularModel.startDate= extracurricularForm.value.startDate;
    this.extracurricularModel.finalDate= extracurricularForm.value.finalDate;
    this.extracurricularModel.idTeacher= extracurricularForm.value.idTeacher;
    this.extracurricularModel.information= extracurricularForm.value.information;
    this.extracurricularModel.schedule= extracurricularForm.value.schedule;

    console.log(this.extracurricularModel)

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
