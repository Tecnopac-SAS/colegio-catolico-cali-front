import { Component, OnInit } from '@angular/core';
import { Leveling } from 'src/app/models/leveling.model';
import { LevelingService } from 'src/app/services/leveling.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import Swal from'sweetalert2';

@Component({
  selector: 'app-leveling-index',
  templateUrl: './leveling-index.component.html',
  styleUrls: ['./leveling-index.component.css']
})
export class LevelingIndexComponent implements OnInit {

  grade !: any;
  navTitle="Estudiantes con asignaturas sin aprobar"
  formValue !:FormGroup
  public dataLeveling:any
  public filter:any;
  public filterText:any;
  levelingModel:Leveling = new Leveling();
  id !: any;
  constructor(
    private formBuilder:FormBuilder,
    private LevelingService:LevelingService,
    private loginService:LoginService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.listLevelings()
    this.fieldCapture()
  }

  fieldCapture(){
    this.formValue = this.formBuilder.group({
      codigo: [''],
      nombres: [''],
      apellidos: [''],
      ModalidadCurso:[''],
      asignatura:[''],
      grado:[''],
      isActive:['']

    })
  }

  listLevelings(){
    this.LevelingService.listLevelings()
    .subscribe(res=>{
      this.dataLeveling=res.result
      console.log(this.dataLeveling)
    })
  }

  search(searchForm:any){

    if(this.filterText==""){
      this.listLevelings();
    }

    else {
      this.LevelingService.listLeveling(searchForm.value.filtro)
      .subscribe(res=>{
        this.dataLeveling=res
        console.log(res)
      })
    }

  }

  deshabilitar(data:any){
   this.levelingModel.isActive = data.isActive
     if (data.isActive=1) {
      this.levelingModel.isActive= 0;
      Swal.fire(
        'Acudiente deshabilitado!',
        '',
        'warning'
       )
    }
    this.LevelingService.deshabilitar(this.levelingModel,data.id)
    .subscribe(res=>{
    //this.listLevelings()
    })
  }

  actualizarEstado(data:any, estado:any){
     this.levelingModel.estadoAprobado = estado
     this.LevelingService.updateLevelingEstado(this.levelingModel,data.id)
     .subscribe(res=>{
      //this.listarCriterio()
     if (res) {
      Swal.fire(
        '¡Cambio de estado exitoso!',
        '',
        'success'
       )
      
     } else {
      Swal.fire(
        '¡No se logró actualizar el estado!',
        '',
        'error'
       )
      
     }
     })
   
  
   }

  activar(data:any){
    this.levelingModel.estadoAprobado = data.estadoAprobado
     if (data.estadoAprobado==0) {
       this.levelingModel.estadoAprobado= 1;
       Swal.fire(
         '¡Estado cursado!',
         '',
         'success'
        )
        this.LevelingService.updateLevelingEstado(this.levelingModel,data.id)
        .subscribe(res=>{
        this.listLevelings()
        })
     }
   }

   inactivar(data:any){
    this.levelingModel.estadoAprobado = data.estadoAprobado
     if (data.estadoAprobado==1) {
       this.levelingModel.estadoAprobado= 0;
       Swal.fire(
         '¡Estado pendiente!',
         '',
         'warning'
        )
        this.LevelingService.updateLevelingEstado(this.levelingModel,data.id)
        .subscribe(res=>{
        this.listLevelings()
        })
     }
   }

  restablecerContrasena(data:any){
      this.loginService.recuperarContrasena(data.email).subscribe(
        response=>{
          console.log(response)
          if(response.mensaje=="El correo no se encuentra registrado en la bd"){
            Swal.fire(
              'El correo no existe!',
              '',
              'error'
             )
          }
  
          else{
            Swal.fire(
              'Se ha enviado un link al correo del acudiente!',
              '',
              'success'
             )
          }
        },
        error=>{
          console.log(error)
          alert(error)
        }
      )
  }
}
