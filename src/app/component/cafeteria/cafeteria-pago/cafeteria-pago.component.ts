import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CafeteriaService } from 'src/app/services/cafeteria.service';
import { LoncheraService } from 'src/app/services/lonchera.service';

@Component({
  selector: 'app-cafeteria-pago',
  templateUrl: './cafeteria-pago.component.html',
  styleUrls: ['./cafeteria-pago.component.css']
})
export class CafeteriaPagoComponent implements OnInit {
  navTitle: any;
  menuSelect: any;
  listMenu: any;
  menu:any
  productMenu:any
  cantMenu:any
  cant:Number
  lonchera:any
  constructor(private cafeteriaService:CafeteriaService,private loncheraService:LoncheraService) {
    this.cant = 0
    this.cafeteriaService.listCafeterias().subscribe(response=>{
      this.listMenu = response.result
    },error=>{

    });
   }

  ngOnInit(): void {
    this.navTitle = "Cafeteria";
    // this.checkBolsillo()
  }
  // checkBolsillo(){
  //   this.loncheraService.getCant(localStorage.getItem('idAcudiente')).subscribe(response=>{
  //     this.lonchera = (response.resp)?response.resp:0
      
  //   },error=>{

  //   });
  // }
  changeSelect(){
    if (this.menuSelect && this.cantMenu) {
      let menu = this.listMenu.find((obj:any) => obj.id == this.menuSelect)
      this.cant = Number(menu.pay)*Number(this.cantMenu)
      this.productMenu = menu.description
    }
  }
  pagar(){
    if (this.cant) {
      Swal.fire({
        title: '¿Estas seguro que deseas dinero a tu lonchera con la opcion bolsillo?',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          if (Number(localStorage.getItem('bolsillo')) >= Number(this.cant)) {
            // let datos = {cant:this.menu.pay,metodoPago:'bolsillo',idEstudiante:localStorage.getItem('idEstudiante')}
            let datos = {cant:this.cant, cantMenu:this.cantMenu, productMenu:this.productMenu ,metodoPago:'bolsillo'}
            this.loncheraService.pagar(datos, localStorage.getItem('idAcudiente')).subscribe(response=>{
              // this.matricula = JSON.stringify(response.result)
              Swal.fire(response.message, '', (response.status)?'success':'error')
              if (response.status) {
                // this.checkBolsillo()
                this.cant = 0
                this.menuSelect = ''
                this.cantMenu = ''
              }
            },error=>{
  
            });
          }else{
            Swal.fire('Parece que no tienes fondos suficientes', 'Favor de ingresar fondos en el bolsillo', 'info')
          }
        }
      })
    }else{
      Swal.fire('Favor de seleccionar un curso', '', 'info')
    }
  }

}
