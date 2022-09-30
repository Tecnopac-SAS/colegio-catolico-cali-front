import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Period } from 'src/app/models/period.model';
import { PeriodService } from 'src/app/services/period.service';
import { Router } from '@angular/router';
import Swal from'sweetalert2';

@Component({
  selector: 'app-period-create',
  templateUrl: './period-create.component.html',
  styleUrls: ['./period-create.component.css']
})
export class PeriodCreateComponent implements OnInit {
 navTitle="Periodo crear"
 formValue!: FormGroup;
 periodModel:Period= new Period();
 public mensaje_ok:any;
 public mensaje_error:any;
 role !: any;
  constructor(
    private formBuilder:FormBuilder,
    private periodService:PeriodService,
    private router:Router
  ) { }

  ngOnInit(): void {
    Swal.fire(
      'Recuerde que el cambio de periodo es una vez al año, ¡Esta acción es irreversible!',
      '',
      'warning'
     )
    this.fieldCapture()
  }

  fieldCapture(){
    this.formValue = this.formBuilder.group({
      age:[''],
      password: [''],
      identifier: [''],
      consecutive: [''],
    })
  }

  CrearPeriodo(){
    this.periodModel.age = this.formValue.value.age;
    this.periodModel.identifier = this.formValue.value.identifier;
    this.periodModel.consecutive = this.formValue.value.consecutive;

    if(this.periodModel.age==""){
      this.mensaje_error="El campo año no puede estar vacio"
    }

    else if(this.periodModel.identifier==""){
      this.mensaje_error="El campo identificador no puede estar vacio"
    }

    else if(this.periodModel.consecutive==0){
      this.mensaje_error="El campo consecutivo no puede estar vacio"
    }

    else{
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success m-2',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: '¡Esta acción es irreversible!',
        text: "¿Desea continuar?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, cambiar periodo!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Cambio de periodo exitoso!',
            '',
            'success'
          )
          this.periodService.createPeriod(this.periodModel)
          .subscribe(res=>{
          console.log(res);
            if (res.mensaje=="El periodo ya existe") {
              this.mensaje_error=res.mensaje;
            }
            else{
              this.mensaje_ok="Se registro correctamente"
              this.formValue = this.formBuilder.group({
                age:[''],
                identifier: [''],
                consecutive: [''],
              })
            }
          },
          err=>{
            console.log(err)
          })
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Proceso cancelado',
            '',
            'error'
          )
        }
      })


    }
  }
  cerrarAlerta(){
    this.mensaje_error=""
  }


}
