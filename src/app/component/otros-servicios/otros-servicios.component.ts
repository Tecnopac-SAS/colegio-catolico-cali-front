import { Component, OnInit } from '@angular/core';
import Data from 'src/assets/json/pago-servicios.json';
@Component({
  selector: 'app-otros-servicios',
  templateUrl: './otros-servicios.component.html',
  styleUrls: ['./otros-servicios.component.css']
})
export class OtrosServiciosComponent implements OnInit {
  public navTitle:any
  data: any = Data;
  constructor() { }

  ngOnInit(): void {
    this.navTitle="Pago de servicios"
  }
  
}
