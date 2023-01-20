import { Component } from '@angular/core';
import { BolsilloService } from './services/bolsillo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public bolsillo: any;
  constructor(private bolsilloService:BolsilloService){
    this.bolsillo = setInterval(()=>{this.checkBolsillo()},5000);
  }
  title = 'front-colegio-catolico';
  checkBolsillo(){
    this.bolsilloService.getCant(localStorage.getItem('idAcudiente')).subscribe(response=>{
     this.bolsillo = response.resp
     localStorage.setItem('bolsillo',this.bolsillo)
   },error=>{
  
   });
  }
}