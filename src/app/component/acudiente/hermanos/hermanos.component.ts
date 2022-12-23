import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Hermano } from 'src/app/models/studentDatabase.model';
import { StudentDatabase } from 'src/app/models/studentDatabase.model';
import { StudentDatabaseService } from 'src/app/services/student-database.service';
import Swal from'sweetalert2';

@Component({
  selector: 'app-hermanos',
  templateUrl: './hermanos.component.html',
  styleUrls: ['./hermanos.component.css']
})
export class HermanosComponent implements OnInit {
  habilitar!:boolean
  hermanoModel:Hermano= new Hermano();
  formValueDatosAdicionalesHermanos!: FormGroup;
  mensaje_ok:any;
  mensaje_error:any;
  @Input()
  miFormulario : any;

  @Input()
  id : any;

  @Input()
  validadorCheck : any;
  constructor(private formBuilder:FormBuilder,
    private studentDatabaseService:StudentDatabaseService,
    private router:Router) { 
  }

  ngOnInit(): void {
    this.validadorCheck=true
  }

  static formulario(){
    return new FormGroup({
      nombres: new FormControl('',[Validators.required]),
      apellidos: new FormControl('',[Validators.required]),
      nivelEstudio: new FormControl('',[Validators.required]),
      institucion: new FormControl('',[Validators.required])
    })
  }
 
  datos(){
    console.log(this.miFormulario.value);
  }

  CrearHermano(){
    //this.newFormHermano.value.nombres
    this.hermanoModel.nombres = this.miFormulario.value.nombres;
    this.hermanoModel.apellidos=this.miFormulario.value.apellidos;
    this.hermanoModel.institucion= this.miFormulario.value.institucion;
    this.hermanoModel.nivelEstudio= this.miFormulario.value.nivelEstudio;

    console.log(this.hermanoModel)
    if(this.hermanoModel.nombres==""){
      this.mensaje_error="El campo nombre no puede estar vacio"
    }

    else if(this.hermanoModel.apellidos==""){
      this.mensaje_error="El campo apellido no puede estar vacio"
    }
    else{
      this.studentDatabaseService.createHermanos(this.hermanoModel)
      .subscribe(res=>{
      console.log(res);
        if (res.mensaje=="el dato ya existe") {
          this.mensaje_error=res.mensaje;
        }
        else{
        this.miFormulario.value.nombres ="";
        this.miFormulario.value.apellidos="";
        this.miFormulario.value.institucion="";
        this.miFormulario.value.nivelEstudio="";
          Swal.fire(
            '¡Hermano agregado!',
            '',
            'success'
           )
          this.mensaje_ok="Se registro correctamente"
     
        }
      },
      err=>{
        console.log(err)
      })
    }
  }
  cerrarAlerta(){
    this.mensaje_error=""
  }

}
