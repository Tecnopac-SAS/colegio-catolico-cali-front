import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CertificateService } from 'src/app/services/certificate.service';

@Component({
  selector: 'app-certificate-add-document',
  templateUrl: './certificate-add-document.component.html',
  styleUrls: ['./certificate-add-document.component.css']
})
export class CertificateAddDocumentComponent implements OnInit {
  @ViewChild("fileInput") fileInput:any;
  private id: number;
  public certificate: any;
  public solicitante: any;
  public archivo: any;
  navTitle="Certificados"
  showSend = false;
  constructor(private route : ActivatedRoute,private certificateService:CertificateService) { 
    this.id = 0;
    this.solicitante = '';
    this.fileInput = {nativeElement:{files:[]}};
    this.certificate = {id:0, name:'', description:'', status:0, type:0, student_id:0, course_id:0, teacher_id:0, created_at:'', updated_at:''}

  }
  ngOnInit(): void {
    this.fieldCaptureIndex()
  }
  fieldCaptureIndex(){
    this.route.params.subscribe(params=>{
      this.id = params['id'];
      this.certificateService.obtenerCertificateInscription(this.id).subscribe(
        response=>{
          this.certificate= response.result;
          this.solicitante = response.result.dataValues.nombres + ' ' + response.result.dataValues.apellidos;
        }
      )
    })
  }
  cambio(){
    if (this.fileInput.nativeElement.files[0]) {
      this.showSend = true;
    }else{
      this.showSend = false;
    }
  }
  sendFile(){
    const formData = new FormData();
    formData.append('file',this.fileInput.nativeElement.files[0])
    formData.append('id',this.id.toString())
    this.certificateService.createDocumentoCertificate(formData)
      .subscribe(res=>{ 
      }
      ,error=>{
        console.log(error)
      }
      )

  }
}
