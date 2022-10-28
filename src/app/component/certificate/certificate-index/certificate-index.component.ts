import { Component, OnInit } from '@angular/core';
import { Certificate } from 'src/app/models/certificate.model';
import { CertificateService } from 'src/app/services/certificate.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import Swal from'sweetalert2';

@Component({
  selector: 'app-certificate-index',
  templateUrl: './certificate-index.component.html',
  styleUrls: ['./certificate-index.component.css']
})
export class CertificateIndexComponent implements OnInit {

  grade !: any;
  navTitle="Certificate"
  formValue !:FormGroup
  public dataCertificate:any
  public filter:any;
  public filterText:any;
  certificateModel:Certificate = new Certificate();
  id !: any;
  constructor(
    private formBuilder:FormBuilder,
    private CertificateService:CertificateService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.listCertificates()
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

  listCertificates(){
    this.CertificateService.listCertificates()
    .subscribe(res=>{
      this.dataCertificate=res.result
      console.log(this.dataCertificate)
    })
  }

  search(searchForm:any){

    if(this.filterText==""){
      this.listCertificates();
    }

    else {
      this.CertificateService.listCertificate(searchForm.value.filtro)
      .subscribe(res=>{
        this.dataCertificate=res.result
        console.log(res.result)
      })
    }

  }

  deshabilitar(data:any){
   this.certificateModel.isActive = data.isActive
    if (data.isActive==0) {
      this.certificateModel.isActive= 1;
      Swal.fire(
        'habilitado!',
        '',
        'success'
       )
    }

    else if (data.isActive=1) {
      this.certificateModel.isActive= 0;
      Swal.fire(
        'deshabilitado!',
        '',
        'warning'
       )
    }
    this.CertificateService.deshabilitar(this.certificateModel,data.id)
    .subscribe(res=>{
    this.listCertificates()
    })


  }
}
