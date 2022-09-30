import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Inscription } from 'src/app/models/inscription.model';
import { InscriptionService } from 'src/app/services/inscription.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { PeriodService } from 'src/app/services/period.service';

@Component({
  selector: 'app-inscription-create',
  templateUrl: './inscription-create.component.html',
  styleUrls: ['./inscription-create.component.css']
})
export class InscriptionCreateComponent implements OnInit {
  idUser !: any;
  period !: any;
  navTitle="crear inscripcion"
  formValue!: FormGroup;
  inscriptionModel:Inscription= new Inscription();
  public mensaje_ok:any;
  public mensaje_error:any;
  constructor(
    private formBuilder:FormBuilder,
    private inscriptionService:InscriptionService,
    private userService:UserService,
    private periodService:PeriodService,
    private router:Router
  ) {this.idUser= this.userService.getId();}

  ngOnInit(): void {
    this.fieldCapture()
    this.periodList()
  }

  fieldCapture(){
    this.formValue = this.formBuilder.group({
      price:[''],
      description: [''],
      isActive: [''],
      idPeriod: [''],
    })
  }


  CrearPeriodo(){
    this.inscriptionModel.price = this.formValue.value.price;
    this.inscriptionModel.description = this.formValue.value.description;
    this.inscriptionModel.isActive = this.formValue.value.isActive;
    this.inscriptionModel.idUser = this.idUser;
    this.inscriptionModel.idPeriod = this.formValue.value.idPeriod;

    if(this.inscriptionModel.price <=0 ){
      this.mensaje_error="El campo precio no puede estar vacio"
    }


    else if(this.inscriptionModel.description==""){
      this.mensaje_error="El campo descripción no puede estar vacio"
    }

    else if(this.inscriptionModel.idPeriod==0){
      this.mensaje_error="El campo periodo no puede estar vacio"
    }

    else{
      this.inscriptionService.createInscription(this.inscriptionModel)
      .subscribe(res=>{
      console.log(res);
        if (res.mensaje=="La inscripción ya existe") {
          this.mensaje_error=res.mensaje;
        }
        else{
          this.mensaje_ok="Se registro correctamente"
          this.formValue = this.formBuilder.group({
            price:[''],
            description: [''],
            isActive: [''],
            idUser: [''],
            idPeriod: [''],
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

  periodList(){
    this.periodService.listPeriod()
    .subscribe(res=>{
      this.period=res.result
      console.log(this.period)
    })

  }

}
