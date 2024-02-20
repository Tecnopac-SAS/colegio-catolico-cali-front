import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Tuition } from 'src/app/models/tuition.model';
import { TuitionService } from 'src/app/services/tuition.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyUtils } from 'src/utils/currencyUtils';
import Swal from'sweetalert2'
import * as moment from 'moment';

@Component({
  selector: 'app-tuition-update',
  templateUrl: './tuition-update.component.html',
  styleUrls: ['./tuition-update.component.css']
})
export class TuitionUpdateComponent implements OnInit {

  Tuition !: any;
  navTitle="Editar matricula"
  public dataTuition:any
  public descripcion:any
  formValue!: FormGroup;
  formValueExtra!: FormGroup;
  tuitionModel:Tuition= new Tuition();
  public mensaje_ok:any;
  public mensaje_error:any;
  id !: any;
  constructor(
    private formBuilder:FormBuilder,
    private TuitionService:TuitionService,
    private currencyUtils: CurrencyUtils,
    private router:Router,
    private route : ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.fieldCapture()

  }

  fieldCapture(){
    this.formValue = this.formBuilder.group({
      ordinary_price: [''],
      extraordinary_price: [''],
      extraordinary_startDate: [''],
      extraordinary_finalDate: [''],
      startDate: [''],
      finalDate: [''],
      grade: [''],
    })
    this.fieldCaptureIndex()
  }

  formatFecha(fecha:any){
    return (moment(fecha).format('YYYY-MM-DD')==='Invalid date')?'':moment(fecha).format('YYYY-MM-DD')
  }

  fieldCaptureIndex(){
    this.route.params.subscribe(params=>{
      this.id = params['id'];
      this.TuitionService.obtenerTuition(this.id).subscribe(
        response=>{
          this.Tuition= response
          console.log(this.Tuition);
          this.formValue.controls['grade'].setValue(this.Tuition.result.grade)
          this.formValue.controls['startDate'].setValue(this.formatFecha(this.Tuition.result.startDate))
          this.formValue.controls['finalDate'].setValue(this.formatFecha(this.Tuition.result.finalDate))
          this.formValue.controls['ordinary_price'].setValue(this.Tuition.result.ordinary_price)
          this.formValue.controls['extraordinary_price'].setValue(this.Tuition.result.extraordinary_price)
          this.formValue.controls['extraordinary_startDate'].setValue(this.formatFecha(this.Tuition.result.extraordinary_startDate))
          this.formValue.controls['extraordinary_finalDate'].setValue(this.formatFecha(this.Tuition.result.extraordinary_finalDate))
          this.tuitionModel.id = this.Tuition.result.id
        }
      )
    })
  }

  actualizarTuition(){
    console.log(this.formValue.value)
    this.tuitionModel.grade= this.formValue.value.grade;
    this.tuitionModel.startDate= this.formValue.value.startDate;
    this.tuitionModel.finalDate= this.formValue.value.finalDate;
    this.tuitionModel.ordinary_price= this.formValue.value.ordinary_price;
    this.tuitionModel.extraordinary_price= this.formValue.value.extraordinary_price;
    this.tuitionModel.extraordinary_startDate= this.formValue.value.extraordinary_startDate;
    this.tuitionModel.extraordinary_finalDate= this.formValue.value.extraordinary_finalDate;
    console.log(this.tuitionModel)
    this.TuitionService.updateTuition(this.id,this.tuitionModel)
   
    .subscribe(res=>{
      Swal.fire(
        'Matricula actualizada!',
        '',
        'success'
       )
       setTimeout(() => {
          this.router.navigate(['matriculas']);
        }, 2000);
    })


  }

  cerrarAlerta(){
    this.mensaje_error=""
  }

}
