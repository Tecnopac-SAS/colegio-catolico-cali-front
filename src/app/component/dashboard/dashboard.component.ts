import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { CurrencyUtils } from 'src/utils/currencyUtils';
import menuAcudiente from 'src/assets/json/sidebarAcudiente.json'
import menuAdmin from 'src/assets/json/sidebarAdmin.json'
import Swal from'sweetalert2';
import * as $ from 'jquery'
import { BolsilloService } from 'src/app/services/bolsillo.service';
import { HistoricoCarteraService } from 'src/app/services/historico-cartera.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  menuItems: any;
  public navTitle:any
  public token:any
  public name: any;
  public role: any;
  public bolsillo: any;
  public saldoPendiente: any;
  isSidebarOpen: any;

  constructor(
    private loginService:LoginService,
    private userService:UserService,
    private bolsilloService:BolsilloService,
    public currencyUtils: CurrencyUtils,
    private historicoCarteraService:HistoricoCarteraService,
    private router:Router)
   {

    this.token= this.loginService.getToken();
    this.name= this.userService.getName();
    this.role= this.userService.getRol();  
    this.bolsillo= localStorage.getItem('bolsillo');
    this.isSidebarOpen = localStorage.getItem('toggle-sidebar') == 'true'? true : false ;
    //Menu por tipo de rol
    this.role === 'admin' ? this.menuItems = menuAdmin : this.menuItems = menuAcudiente
   }
   
  ngOnInit(): void {
    this.sessionValidation();
    console.log(this.role);
    
    if(this.role == 'acudiente'){
      this.checkBolsillo();
    }
    this.navTitle="Estoy en dash " + this.name
    this.bolsillo= localStorage.getItem('bolsillo');
    this.historicoCarteraService.totalDeuda({idAcudiente:localStorage.getItem('idAcudiente')}).subscribe(response=>{
      this.saldoPendiente = response.result
    },error=>{

    });
  }

  sessionValidation(){
    if(this.token){

    }
    else{
      this.router.navigate([''])
    }
  }
  checkBolsillo(){
    console.log('bolsillo');
     this.bolsilloService.getCant(localStorage.getItem('idAcudiente')).subscribe(response=>{
      this.bolsillo = response.resp
      localStorage.setItem('bolsillo',this.bolsillo)
    },error=>{

    });
  }
  SignOff(){

    localStorage.removeItem('token');
    localStorage.removeItem('idRole');
    localStorage.removeItem('usuario');
    localStorage.removeItem('id');
    localStorage.removeItem('bolsillo');

    Swal.fire(
      'Has cerrado sesión correctamente!',
     )

    this.router.navigate([''])

  }
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
      localStorage.setItem('toggle-sidebar',this.isSidebarOpen);
    }
  }
