import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Leveling } from 'src/app/models/leveling.model';
import { LevelingService } from 'src/app/services/leveling.service';
import { Router,ActivatedRoute } from '@angular/router';
import Swal from'sweetalert2'

@Component({
  selector: 'app-leveling-create',
  templateUrl: './leveling-create.component.html',
  styleUrls: ['./leveling-create.component.css']
})
export class LevelingCreateComponent implements OnInit {
  
  public filter:any;
  public filterText:any;
  public dataLeveling:any
  id !: any;
  codigo !: any;
  Leveling !: any;
  navTitle="Nueva nivelación"
  formValue!: FormGroup;
  formValueExtra!: FormGroup;
  LevelingModel:Leveling= new Leveling();
  public mensaje_ok:any;
  public mensaje_error:any;
  constructor(
    private formBuilder:FormBuilder,
    private LevelingService:LevelingService,
    private router:Router,
    private route : ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.fieldCapture()
  }

  fieldCapture(){
    this.formValue = this.formBuilder.group({
      codigo: [''],
      nombres: [''],
      apellidos: [''],
      modalidadCurso:[''],
      asignatura:[''],
      grado:[''],

    })
  }

  search(searchForm:any){

    if(this.filterText==""){
      
    }

    else {
      this.LevelingService.listLeveling(searchForm.value.filtro)
      .subscribe(res=>{
        this.dataLeveling=res.result
        this.formValue = this.formBuilder.group({
          nombres: [this.dataLeveling[0].nombres],
          apellidos: [this.dataLeveling[0].apellidos],
          modalidadCurso:[this.dataLeveling[0].modalidadCurso],
          asignatura:[this.dataLeveling[0].asignatura],
          grado:[this.dataLeveling[0].grado],
       
    
        })
        console.log(this.dataLeveling[0])
      })
    }

  }


  CrearNivelacion(){
    this.LevelingModel.nombres = this.formValue.value.nombres;
    this.LevelingModel.apellidos = this.formValue.value.apellidos;
    this.LevelingModel.codigo = this.filterText;
    this.LevelingModel.modalidadCurso = this.formValue.value.modalidadCurso;
    this.LevelingModel.asignatura = this.formValue.value.asignatura;
    this.LevelingModel.grado = this.formValue.value.grado;

    if(this.LevelingModel.nombres =="" ){
      this.mensaje_error="El campo nombre  no puede estar vacio"
    }

    else if(this.LevelingModel.apellidos  =="" ){
      this.mensaje_error="El campo apellido no puede estar vacio"
    }

    else if(this.LevelingModel.codigo  =="" ){
      this.mensaje_error="El campo código no puede estar vacio"
    }

   
    else{
      this.LevelingService.createLeveling(this.LevelingModel)
      .subscribe(res=>{
      console.log(res);
      console.log(this.LevelingModel);
        if (res.mensaje=="la nivelación ya existe") {
          this.mensaje_error=res.mensaje;
        }
        else{
          this.mensaje_ok="Se registro correctamente"
          this.formValue = this.formBuilder.group({
            codigo: [''],
            nombres: [''],
            apellidos: [''],
            modalidadCurso:[''],
            asignatura:[''],
            grado:[''],
          })
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
