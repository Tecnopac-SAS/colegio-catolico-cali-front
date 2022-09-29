import { Component, OnInit } from '@angular/core';
import { PeriodService } from 'src/app/services/period.service';
import { Period } from 'src/app/models/period.model';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import Swal from'sweetalert2';

@Component({
  selector: 'app-period-index',
  templateUrl: './period-index.component.html',
  styleUrls: ['./period-index.component.css']
})
export class PeriodIndexComponent implements OnInit {
  navTitle="periodo index"
  public dataPeriod:any
  formValue !:FormGroup

  constructor(
    private formBuilder:FormBuilder,
    private periodService:PeriodService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.listPeriods()
  }

  listPeriods(){
    this.periodService.listPeriod()
    .subscribe(res=>{
      this.dataPeriod=res.result
      console.log(this.dataPeriod)
    })
  }

}
