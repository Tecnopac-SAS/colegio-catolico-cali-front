import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-certificados',
  templateUrl: './certificados.component.html',
  styleUrls: ['./certificados.component.css']
})
export class CertificadosComponent implements OnInit {
  public navTitle:any
  constructor() { }

  ngOnInit(): void {
    this.navTitle = 'Certificados'
  }

}
