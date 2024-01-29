import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Extracurricular } from 'src/app/models/extracurricular.model';
import { ExtracurricularFile } from 'src/app/models/extracurricular.model';
import { ExtracurricularService } from 'src/app/services/extracurricular.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-extracurricular-create',
  templateUrl: './extracurricular-create.component.html',
  styleUrls: ['./extracurricular-create.component.css'],

})
export class ExtracurricularCreateComponent implements OnInit {

  teacherData !: any;
  navTitle = "Crear extracurricular"
  public dataExtracurricular: any
  formValue!: FormGroup;
  extracurricularModel: Extracurricular = new Extracurricular();
  public mensaje_ok: any;
  public mensaje_error: any;
  public file!: File;
  imageUrl !: any;
  public imgSelect: String | ArrayBuffer | any;

  constructor(
    private formBuilder: FormBuilder,
    private extracurricularService: ExtracurricularService,
    private router: Router,
    private teacherService: TeacherService,
  ) { this.dataExtracurricular = new ExtracurricularFile('', '', '', '', 0, 0, '', ''); }

  ngOnInit(): void {

    this.fieldCapture()
    this.idTeacherList()

  }

  fieldCapture() {
    this.formValue = this.formBuilder.group({

      startDate: [''],
      finalDate: [''],
      idTeacher: [''],
      activity: [''],
      price: [''],
      information: [''],
      schedule: [''],
      isActive: [''],
    })
  }

  CrearExtracurricular() {
    this.extracurricularModel.imagen = this.formValue.value.imageUrl;
    this.extracurricularModel.startDate = this.formValue.value.startDate;
    this.extracurricularModel.finalDate = this.formValue.value.finalDate;
    this.extracurricularModel.idTeacher = this.formValue.value.idTeacher;
    this.extracurricularModel.activity = this.formValue.value.activity;
    this.extracurricularModel.price = this.formValue.value.price;
    this.extracurricularModel.information = this.formValue.value.information;
    this.extracurricularModel.schedule = this.formValue.value.schedule;
    this.extracurricularModel.isActive = this.formValue.value.isActive;
    console.log("en crear " + this.extracurricularModel.imagen)
    console.log(this.file)
    if (this.extracurricularModel.startDate == "") {
      this.mensaje_error = "El campo Fecha de inicio no puede estar vacio"
    }

    else if (this.extracurricularModel.imagen == "") {
      this.mensaje_error = "El campo imagen no puede estar vacio"
    }

    else if (this.extracurricularModel.activity == "") {
      this.mensaje_error = "El campo actividad no puede estar vacio"
    }

    else if (this.extracurricularModel.finalDate == "") {
      this.mensaje_error = "El campo Fecha final no puede estar vacio"
    }

    else if (this.extracurricularModel.price == 0) {
      this.mensaje_error = "El campo precio  no puede estar vacio"
    }

    else if (this.extracurricularModel.idTeacher == 0) {
      this.mensaje_error = "El campo docente  no puede estar vacio"
    }


    else {
      console.log("desde el front " + this.extracurricularModel)
      this.extracurricularService.createExtracurricular(this.extracurricularModel)
        .subscribe(res => {
          console.log("Estoy en res " + res);

          this.mensaje_ok = "Se registro correctamente"
          this.formValue = this.formBuilder.group({

            imagen: [''],
            startDate: [''],
            finalDate: [''],
            idTeacher: [''],
            activity: [''],
            price: [''],
            information: [''],
            schedule: [''],
            isActive: [''],

          })

        },
          err => {
            console.log(err)
          })
    }
  }

  onSubmit(extracurricularForm: any) {
    if (extracurricularForm.valid) {
      console.log(extracurricularForm.value.idTeacher)
      this.extracurricularService.createExtracurricularFile({
        imagen: extracurricularForm.value.imageUrl,
        startDate: extracurricularForm.value.startDate,
        finalDate: extracurricularForm.value.finalDate,
        activity: extracurricularForm.value.activity,
        idTeacher: extracurricularForm.value.idTeacher,
        price: extracurricularForm.value.price,
        information: extracurricularForm.value.information,
        schedule: extracurricularForm.value.schedule,
        isActive: extracurricularForm.value.isActive,

      }).subscribe(
        response => {
          this.mensaje_ok = 'la información se registro  correctamente';
          this.dataExtracurricular = new ExtracurricularFile('', '', '', '', 0, 0, '', '');
          this.imgSelect = '../../../../assets/img/default.jpg';
          this.imageUrl = ""
          this.file = this.imgSelect;
        },
        error => {

        }
      );
      Swal.fire(
        'Extracurricular Creado con exito!',
        '',
        'success'
      ).then((result) => {
        this.router.navigate(['extracurriculares']);
      });
    } else {
      this.mensaje_error = 'Complete correctamente el formulario';

    }
  }

  cerrarAlerta() {
    this.mensaje_error = ""
  }

  imageSelect(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imgSelect = reader.result;
      reader.readAsDataURL(this.file);
      console.log("soy el file " + this.file)
      console.log("soy el file " + this.file.name)
    }
  }

  idTeacherList() {
    this.teacherService.listTeachers()
      .subscribe(res => {
        this.teacherData = res.result
        console.log(this.teacherData)
      })

  }

}
