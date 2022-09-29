import { Component, OnInit } from '@angular/core';
import { InscriptionService } from 'src/app/services/inscription.service';
import { Inscription } from 'src/app/models/inscription.model';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import Swal from'sweetalert2';

@Component({
  selector: 'app-inscription-index',
  templateUrl: './inscription-index.component.html',
  styleUrls: ['./inscription-index.component.css']
})
export class InscriptionIndexComponent implements OnInit {
  navTitle="inscripcion index"
  formValue !:FormGroup
  public dataInscription:any
  constructor(
    private formBuilder:FormBuilder,
    private inscriptionService:InscriptionService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.listInscriptions()
  }

  listInscriptions(){
    this.inscriptionService.listInscription()
    .subscribe(res=>{
      this.dataInscription=res.result
      console.log(this.dataInscription)
    })
  }

}
