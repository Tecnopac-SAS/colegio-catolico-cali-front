import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pension-pago',
  templateUrl: './pension-pago.component.html',
  styleUrls: ['./pension-pago.component.css']
})
export class PensionPagoComponent implements OnInit {
  navTitle="Pago de pension"
  public pension:any

  constructor() { }

  ngOnInit(): void {
  }

}
