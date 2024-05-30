import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acuerdos-pago-update',
  templateUrl: './acuerdos-pago-update.component.html',
  styleUrls: ['./acuerdos-pago-update.component.css']
})
export class AcuerdosPagoUpdateComponent implements OnInit {
  public navTitle:any
  constructor() { }

  ngOnInit(): void {
    this.navTitle = 'Editar Acuerdo de Pago'
  }

}
