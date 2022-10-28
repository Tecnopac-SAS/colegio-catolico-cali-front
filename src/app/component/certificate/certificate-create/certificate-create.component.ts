import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Certificate } from 'src/app/models/certificate.model';
import { CertificateService } from 'src/app/services/certificate.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-certificate-create',
  templateUrl: './certificate-create.component.html',
  styleUrls: ['./certificate-create.component.css']
})
export class CertificateCreateComponent implements OnInit {

  certificate !: any;
  navTitle="descuento crear"
  public dataTransporte:any
  formValue!: FormGroup;
  formValueExtra!: FormGroup;
  certificateModel:Certificate= new Certificate();
  public mensaje_ok:any;
  public mensaje_error:any;
  constructor(
    private formBuilder:FormBuilder,
    private CertificateService:CertificateService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.fieldCapture()

  }

  fieldCapture(){
    this.formValue = this.formBuilder.group({
      concept: [''],
      time: [''],
      channel:[''],
      applicant:[''],
      price:[''],
      isActive:['']

    })
  }

  CrearCertificate(){
    this.certificateModel.concept = this.formValue.value.concept;
    this.certificateModel.time = this.formValue.value.time;
    this.certificateModel.channel = this.formValue.value.channel;
    this.certificateModel.applicant = this.formValue.value.applicant;
    this.certificateModel.price = this.formValue.value.price;;
    this.certificateModel.isActive = this.formValue.value.isActive;

    if(this.certificateModel.concept =="" ){
      this.mensaje_error="El campo concepto no puede estar vacio"
    }

    else if(this.certificateModel.time  == "" ){
      this.mensaje_error="El campo tiempo no puede estar vacio"
    }

    else if(this.certificateModel.channel  == "" ){
      this.mensaje_error="El campo canal no puede estar vacio"
    }

    else if(this.certificateModel.applicant  == "" ){
      this.mensaje_error="El campo solicitante no puede estar vacio"
    }

    else if(this.certificateModel.price  == 0 ){
      this.mensaje_error="El campo precio no puede estar vacio"
    }



    else{
      this.CertificateService.createCertificate(this.certificateModel)
      .subscribe(res=>{
      console.log(res);
        if (res.mensaje=="el dato ya existe") {
          this.mensaje_error=res.mensaje;
        }
        else{
          this.mensaje_ok="Se registro correctamente"
          this.formValue = this.formBuilder.group({
            concept: [''],
            time: [''],
            channel:[''],
            applicant:[''],
            price:[''],
            isActive:['']
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
