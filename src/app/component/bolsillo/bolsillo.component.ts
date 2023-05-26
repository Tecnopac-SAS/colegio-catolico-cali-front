import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BolsilloService } from 'src/app/services/bolsillo.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bolsillo',
  templateUrl: './bolsillo.component.html',
  styleUrls: ['./bolsillo.component.css']
})
export class BolsilloComponent implements OnInit {
  navTitle="Bolsillo"
  public bolsillo: any
  formValue!: FormGroup 
  public disableButton: boolean = true;

  constructor(
    private formBuilder:FormBuilder,
    private bolsilloService:BolsilloService
    ) { 
      this.bolsillo =  localStorage.getItem('bolsillo')
      this.formValue = this.formBuilder.group({
        cant: ['', [Validators.required, Validators.min(0), Validators.max(5000)]]
      });
  }

  ngOnInit(): void {
    this.fieldCapture()
    this.bolsillo = localStorage.getItem('bolsillo')
  }

  validateNumber(event: any) {
    let numberInput: any = event.target;
    let number = parseFloat(numberInput.value);
    let minValue = 1;
    let maxValue = 5000000;
  
    if (number < minValue) {
      numberInput.value = minValue.toString();
      this.disableButton = true; // Deshabilitar el botón
    } else if (number > maxValue) {
      numberInput.value = maxValue.toString();
      this.disableButton = true; // Deshabilitar el botón
    } else {
      this.disableButton = false; // Habilitar el botón
    }
  }
  fieldCapture(){
    this.formValue= this.formBuilder.group({
      cant:['']
    })
  }
  checkBolsillo(){
    this.bolsilloService.getCant(localStorage.getItem('idAcudiente')).subscribe(response=>{
      this.bolsillo = response.resp
      
      localStorage.setItem('bolsillo',this.bolsillo)
    },error=>{

    });
  }
  recargarBolsillo(){
    this.bolsilloService.recarga(this.formValue.value,localStorage.getItem('idAcudiente')).subscribe(
      response=>{
        if (response.mensaje=='ok') {
          this.checkBolsillo()
          Swal.fire(
            'Bolsillo actualizado',
            '',
            'success'
          ).then((result) => {
            window.location.reload();
        })
          this.formValue= this.formBuilder.group({
            cant:['']
          })
        }

      },
      error=>{
        console.log(error)
        alert(error)
      }
    )
    console.log(this.formValue.value)
  }
}
