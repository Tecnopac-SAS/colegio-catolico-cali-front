import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Deudas } from 'src/app/models/deudas.model';
import { DeudasService } from 'src/app/services/deudas.service';
import { PensionService } from 'src/app/services/pension.service';
import { StudentDatabaseService } from 'src/app/services/student-database.service';
import { CurrencyUtils } from 'src/utils/currencyUtils';

import { Router } from '@angular/router';


@Component({
  selector: 'app-deudas-create',
  templateUrl: './deudas-create.component.html',
  styleUrls: ['./deudas-create.component.css']
})
export class DeudasCreateComponent implements OnInit {

  navTitle="Crear Deuda"
  public dataTransporte:any
  formValue!: FormGroup;
  formValueExtra!: FormGroup;
  DeudasModel:Deudas= new Deudas();
  public mensaje_ok:any;
  public mensaje_error:any;
  idEstudianteSelected: any;
  grades: any;
  estudiantes: any;
  constructor(
    private formBuilder:FormBuilder,
    private DeudasService:DeudasService,
    private currencyUtils: CurrencyUtils,
    private PensionService: PensionService,
    private studentDatabaseService: StudentDatabaseService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.fieldCapture()
    this.PensionService.listGrades().subscribe(res=>{
      this.grades = res.result;
      console.log(this.grades);
    })
    this.studentDatabaseService.listStudentDatabases().subscribe(res => {
      this.estudiantes = res.result;
      console.log(this.estudiantes);
    })
  }

  fieldCapture(){
    this.formValue = this.formBuilder.group({
      deudaCode: [''],
      concepto: [''],
      fechaInicio:[''],
      fechaFinal:[''],
      monto:[''],
      cobro:[''],
      cobroValue:['']
    })
  }


  formatCurrency(amount: number): string {
    return this.currencyUtils.formatCurrency(amount);
  }

  CrearDeuda(){
    this.DeudasModel.deudaCode = [...Array(8)].map(() => (~~(Math.random() * 36)).toString(36)).join('');
    this.DeudasModel.concepto = this.formValue.value.concepto;
    this.DeudasModel.fechaInicio = this.formValue.value.fechaInicio;
    this.DeudasModel.fechaFinal = this.formValue.value.fechaFinal;
    this.DeudasModel.estado = 'Pendiente';
    this.DeudasModel.monto = this.formValue.value.monto;
    this.DeudasModel.cobro = this.formValue.value.cobro;
    this.DeudasModel.cobroValue = this.formValue.value.cobroValue.split(' - ')[0];

    console.log(this.DeudasModel);

    if(this.DeudasModel.concepto =="" ){
      this.mensaje_error="El campo concepto no puede estar vacio"
    }
    else if(this.DeudasModel.fechaInicio  == "" ){
      this.mensaje_error="El Fecha Inicio no puede estar vacio"
    }
    else if(this.DeudasModel.fechaFinal  == "" ){
      this.mensaje_error="El Fecha Final no puede estar vacio"
    }
    else if(this.DeudasModel.monto  == 0){
      this.mensaje_error="El campo monto no puede estar vacio"
    }
    else{
      this.DeudasService.crearDeuda(this.DeudasModel)
      .subscribe(res=>{
      console.log(res);
        if (res.mensaje=="el dato ya existe") {
          this.mensaje_error=res.mensaje;
        }
        else{
          this.mensaje_ok="Se registro correctamente"
          this.formValue = this.formBuilder.group({
            deudaCode: [''],
            concepto: [''],
            fechaInicio:[''],
            fechaFinal:[''],
            monto:[''],
            cobro:[''],
            cobroValue:['']
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
