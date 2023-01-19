import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bolsillo',
  templateUrl: './bolsillo.component.html',
  styleUrls: ['./bolsillo.component.css']
})
export class BolsilloComponent implements OnInit {
  navTitle="Bolsillo"
  public bolsillo: any;


  constructor() { this.bolsillo= localStorage.getItem('bolsillo')}

  ngOnInit(): void {
  }

}
