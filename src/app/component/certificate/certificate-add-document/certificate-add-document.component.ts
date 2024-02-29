import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { CertificateInscriptions } from 'src/app/models/certificateInscriptions.model';
import { CertificateService } from 'src/app/services/certificate.service';


import Swal from 'sweetalert2';

@Component({
  selector: 'app-certificate-add-document',
  templateUrl: './certificate-add-document.component.html',
  styleUrls: ['./certificate-add-document.component.css']
})
export class CertificateAddDocumentComponent implements OnInit {
  private id: number;
  public certificate: any;
  public documentUrl: any;
  public solicitante: any;
  formValue!: FormGroup;
  CertificateInscriptionsModel:CertificateInscriptions= new CertificateInscriptions();
  public archivo: any;
  navTitle="Solicitud certificado"
  showSend = false;
  constructor(private route : ActivatedRoute,
    private certificateService:CertificateService,
    private formBuilder:FormBuilder,
    private router:Router) { 
    this.id = 0;
    this.solicitante = '';
    this.certificate = {id:0, name:'', description:'', status:0, type:0, student_id:0, course_id:0, teacher_id:0, created_at:'', updated_at:'',
    certificateInscriptionAsEstudiante:{
      nombres: '',
      apellid: '',
      codigo: ''
    },
    certificateInscriptionAsGrade:{
      description: ''
    },
    certificateInscriptionAsCertificate:{
      concept: '',
      time: '',
      channel: '',
      price: ''
    }
  }

  } 
  ngOnInit(): void {
    this.fieldCapture()
  }

  fieldCapture(){
    this.formValue = this.formBuilder.group({
      documentUrl: [''],
      status:[''],
    })
    this.fieldCaptureIndex()
  }

  fieldCaptureIndex(){
    this.route.params.subscribe(params=>{
      this.id = params['id'];
      this.certificateService.obtenerCertificateInscription(this.id).subscribe(
        response=>{
          this.certificate= response.result.result;
          this.solicitante = response.result.dataValues.nombres + ' ' + response.result.dataValues.apellidos;
          this.formValue.controls['status'].setValue(this.certificate.status)
          this.formValue.controls['documentUrl'].setValue(response.result.result.documentUrl)
          console.log(this.certificate);
        }
      )
    })
  }
  actualizarInscripcion(){

    this.CertificateInscriptionsModel.documentUrl= this.formValue.value.documentUrl;
    this.CertificateInscriptionsModel.status= this.formValue.value.status;

    this.certificateService.updateCertificateInscription(this.CertificateInscriptionsModel,this.id).subscribe(
      response=>{
        Swal.fire(
          'Solicitud actualizada!',
          '',
          'success'
         )
         setTimeout(() => {
            this.router.navigate(['certificados-solicitud']);
          }, 2000);
    })
  }
}
