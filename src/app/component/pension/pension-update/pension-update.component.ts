import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Pension } from 'src/app/models/pension.model';
import { PensionService } from 'src/app/services/pension.service';
import { DiscountService } from 'src/app/services/discount.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from'sweetalert2'

@Component({
  selector: 'app-pension-update',
  templateUrl: './pension-update.component.html',
  styleUrls: ['./pension-update.component.css']
})
export class PensionUpdateComponent implements OnInit {

  Pension !: any;
  navTitle="Editar pensión"
  public dataPension:any
  public descripcion:any
  formValue!: FormGroup;
  pensionModel:Pension= new Pension();
  public mensaje_ok:any;
  public mensaje_error:any;
  id !: any;
  dataDiscount: any;
  constructor(
    private formBuilder:FormBuilder,
    private PensionService:PensionService,
    private DiscountService:DiscountService,
    private router:Router,
    private route : ActivatedRoute,
  ) {
    this.dataDiscount = []

    // Descuentos 
    this.DiscountService.listDiscounts()
    .subscribe(res=>{
      this.dataDiscount=res.result
    })  
  }

  ngOnInit(): void {
    this.fieldCapture()

  }

  fieldCapture(){
    this.formValue = this.formBuilder.group({
      price:[''],
      discount: [''],
      idGrade: [''],
    })
    this.fieldCaptureIndex()
  }

  fieldCaptureIndex(){
    this.route.params.subscribe(params=>{
      this.id = params['id'];
      this.PensionService.obtenerPension(this.id).subscribe(
        response=>{
          this.Pension= response
          console.log(this.Pension)
          this.formValue.controls['price'].setValue(this.Pension.result.price)
          this.formValue.controls['discount'].setValue(this.Pension.result.discount)
          this.formValue.controls['idGrade'].setValue(this.Pension.result.idGrade)
          this.descripcion=this.Pension.result.description
          this.pensionModel.id = this.Pension.result.id
        }
      )
    })
  }

  actualizarPension(){
    console.log(this.formValue.value)
    this.pensionModel.price= this.formValue.value.price;
    this.pensionModel.discount= this.formValue.value.discount;
    this.pensionModel.idGrade= this.formValue.value.idGrade;
    console.log(this.pensionModel)
    this.PensionService.updatePension(this.id,this.pensionModel)
   
    .subscribe(res=>{

      Swal.fire(
        'Pensión actualizada!',
        '',
        'success'
       )
       setTimeout(() => {
          this.router.navigate(['pension']);
        }, 2000);
    })


  }

  cerrarAlerta(){
    this.mensaje_error=""
  }

}
