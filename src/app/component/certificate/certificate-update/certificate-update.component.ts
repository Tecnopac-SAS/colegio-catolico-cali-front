import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Certificate } from 'src/app/models/certificate.model';
import { CertificateService } from 'src/app/services/certificate.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from'sweetalert2'

@Component({
  selector: 'app-certificate-update',
  templateUrl: './certificate-update.component.html',
  styleUrls: ['./certificate-update.component.css']
})
export class CertificateUpdateComponent implements OnInit {

  Certificate !: any;
  navTitle="descuento editar"
  public dataCertificate:any
  formValue!: FormGroup;
  formValueExtra!: FormGroup;
  CertificateModel:Certificate= new Certificate();
  public mensaje_ok:any;
  public mensaje_error:any;
  id !: any;
  constructor(
    private formBuilder:FormBuilder,
    private CertificateService:CertificateService,
    private router:Router,
    private route : ActivatedRoute,
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
    this.fieldCaptureIndex()
  }

  fieldCaptureIndex(){
    this.route.params.subscribe(params=>{
      this.id = params['id'];
      this.CertificateService.obtenerCertificate(this.id).subscribe(
        response=>{
          this.Certificate= response
          console.log(this.Certificate)
          this.formValue.controls['concept'].setValue(this.Certificate.result.concept)
          this.formValue.controls['time'].setValue(this.Certificate.result.time)
          this.formValue.controls['channel'].setValue(this.Certificate.result.channel)
          this.formValue.controls['applicant'].setValue(this.Certificate.result.applicant)
          this.formValue.controls['price'].setValue(this.Certificate.result.price)
          this.formValue.controls['isActive'].setValue(this.Certificate.result.isActive)
          this.CertificateModel.id = this.Certificate.result.id
        }
      )
    })
  }

  actualizarCertificate(){
    console.log(this.formValue.value)
    this.CertificateModel.concept= this.formValue.value.concept;
    this.CertificateModel.time= this.formValue.value.time;
    this.CertificateModel.channel= this.formValue.value.channel;
    this.CertificateModel.applicant= this.formValue.value.applicant;
    this.CertificateModel.price= this.formValue.value.price;
    this.CertificateModel.isActive= this.formValue.value.isActive;
    console.log(this.CertificateModel)

    if(this.CertificateModel.concept =="" ){
      this.mensaje_error="El campo concepto no puede estar vacio"
    }

    else if(this.CertificateModel.time  == "" ){
      this.mensaje_error="El campo tiempo no puede estar vacio"
    }

    else if(this.CertificateModel.channel  == "" ){
      this.mensaje_error="El campo canal no puede estar vacio"
    }

    else if(this.CertificateModel.applicant  == "" ){
      this.mensaje_error="El campo solicitante no puede estar vacio"
    }

    else if(this.CertificateModel.price  == 0 ){
      this.mensaje_error="El campo precio no puede estar vacio"
    }


    else {
    this.CertificateService.updateCertificate(this.CertificateModel,this.id)
    .subscribe(res=>{

      Swal.fire(
        'certificado actualizado!',
        'You clicked the button!',
        'success'
       )
       setTimeout(() => {
          this.router.navigate(['certificate']);
        }, 2000);
    })
   }
  }



  cerrarAlerta(){
    this.mensaje_error=""
  }

}
