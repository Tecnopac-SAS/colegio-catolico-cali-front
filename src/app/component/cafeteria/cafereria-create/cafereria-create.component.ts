import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Cafeteria } from 'src/app/models/cateteria.model';
import { CafeteriaService } from 'src/app/services/cafeteria.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cafereria-create',
  templateUrl: './cafereria-create.component.html',
  styleUrls: ['./cafereria-create.component.css']
})
export class CafereriaCreateComponent implements OnInit {

  cafeteria !: any;
  navTitle="cafeteria crear"
  public dataTransporte:any
  formValue!: FormGroup;
  formValueExtra!: FormGroup;
  cafeteriaModel:Cafeteria= new Cafeteria();
  public mensaje_ok:any;
  public mensaje_error:any;
  constructor(
    private formBuilder:FormBuilder,
    private cafeteriaService:CafeteriaService,
    private router:Router
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
  }

  CrearCafeteria(){
    this.cafeteriaModel.description = this.formValue.value.description;
    this.cafeteriaModel.pay = this.formValue.value.pay;
    this.cafeteriaModel.isActive = this.formValue.value.isActive;

    if(this.cafeteriaModel.description =="" ){
      this.mensaje_error="El campo descripción no puede estar vacio"
    }

    else if(this.cafeteriaModel.pay  <=0 ){
      this.mensaje_error="El campo precio no puede estar vacio"
    }



    else{
      this.cafeteriaService.createCafeteria(this.cafeteriaModel)
      .subscribe(res=>{
      console.log(res);
        if (res.mensaje=="el dato ya existe") {
          this.mensaje_error=res.mensaje;
        }
        else{
          this.mensaje_ok="Se registro correctamente"
          this.formValue = this.formBuilder.group({
            description: [''],
            pay: [''],
            isActive:[''],
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
