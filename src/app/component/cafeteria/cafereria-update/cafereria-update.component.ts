import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Cafeteria } from 'src/app/models/cateteria.model';
import { CafeteriaService } from 'src/app/services/cafeteria.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from'sweetalert2'

@Component({
  selector: 'app-cafereria-update',
  templateUrl: './cafereria-update.component.html',
  styleUrls: ['./cafereria-update.component.css']
})
export class CafereriaUpdateComponent implements OnInit {
  cafeteria !: any;
  navTitle="cafeteria editar"
  public datacafeteria:any
  formValue!: FormGroup;
  formValueExtra!: FormGroup;
  cafeteriaModel:Cafeteria= new Cafeteria();
  public mensaje_ok:any;
  public mensaje_error:any;
  id !: any;
  constructor(
    private formBuilder:FormBuilder,
    private cafeteriaService:CafeteriaService,
    private router:Router,
    private route : ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.fieldCapture()

  }

  fieldCapture(){
    this.formValue = this.formBuilder.group({
      description: [''],
      pay: [''],
      isActive:[''],
    })
    this.fieldCaptureIndex()
  }

  fieldCaptureIndex(){
    this.route.params.subscribe(params=>{
      this.id = params['id'];
      this.cafeteriaService.obtenerCafeteria(this.id).subscribe(
        response=>{
          this.cafeteria= response
          console.log(this.cafeteria)
          this.formValue.controls['description'].setValue(this.cafeteria.result.description)
          this.formValue.controls['pay'].setValue(this.cafeteria.result.pay)
          this.formValue.controls['isActive'].setValue(this.cafeteria.result.isActive)
          this.cafeteriaModel.id = this.cafeteria.result.id


        }
      )
    })
  }

  actualizarCafeteria(){
    console.log(this.formValue.value)
    this.cafeteriaModel.description= this.formValue.value.description;
    this.cafeteriaModel.pay= this.formValue.value.pay;
    this.cafeteriaModel.isActive= this.formValue.value.isActive;
    console.log(this.cafeteriaModel)
    this.cafeteriaService.updateCafeteria(this.cafeteriaModel,this.id)
    .subscribe(res=>{

      Swal.fire(
        'Ítem actualizado!',
        '',
        'success'
       )
       setTimeout(() => {
          this.router.navigate(['cafeteria']);
        }, 2000);
    })


  }



  cerrarAlerta(){
    this.mensaje_error=""
  }

}
