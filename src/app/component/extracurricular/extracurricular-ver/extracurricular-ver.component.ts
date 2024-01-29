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
  selector: 'app-extracurricular-ver',
  templateUrl: './extracurricular-ver.component.html',
  styleUrls: ['./extracurricular-ver.component.css']
})
export class ExtracurricularVerComponent implements OnInit {

  teacherData !: any;
  public base_url = environment.url;
  navTitle="Ver extracurricular"
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


  idTeacherList(){
    this.teacherService.listTeachers()
    .subscribe(res=>{
      this.teacherData=res.result
      console.log(this.teacherData)
    })

  }

}
