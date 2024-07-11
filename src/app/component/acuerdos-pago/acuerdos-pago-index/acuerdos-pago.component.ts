import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { acuerdosPagos } from 'src/app/services/acuerdos-pago.service';
import { Router } from '@angular/router';

import * as moment from 'moment';

@Component({
  selector: 'app-acuerdos-pago',
  templateUrl: './acuerdos-pago.component.html',
  styleUrls: ['./acuerdos-pago.component.css']
})
export class AcuerdosPagoComponent implements OnInit {


  //Datable 
  @ViewChild('datosAcudienteTemplate', { static: true }) datosAcudienteTemplate!: TemplateRef<any>;
  @ViewChild('accionesTemplate', { static: true }) accionesTemplate!: TemplateRef<any>;
  @ViewChild('estadoTemplate', { static: true }) estadoTemplate!: TemplateRef<any>;
  columns: Array<any> = [];
  public filterText:any;

  navTitle = 'Acuerdos de Pago'

  acuerdosPagos: any;

  constructor(
    private acuerdosPagosService:acuerdosPagos,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.listAcuerdosPagos();
    //Datable 
    this.columns = [
      { header: '#', field: 'id' },
      { header: 'Datos Acudiente', field: 'datosAcudiente'},
      { header: 'Fecha', field: 'fecha'},
      { header: 'Descripción', field: 'description' },
      { header: 'Valor Total', field: 'valor', format: 'currency' },
      { header: 'Estado', field: 'estado', format: 'template', template: this.estadoTemplate },
      { header: 'Acciones', field: '', format: 'template', template: this.accionesTemplate }
    ];
  }

  //Datable 
  viewDetail(itemId: number, acudienteId: number) {
    this.router.navigate(['/acuerdos-pago', itemId, acudienteId]);
  }

  formatFecha(fecha: any) {
    const fechaColombia = moment(fecha).tz('America/Bogota');
    return fechaColombia.isValid() ? fechaColombia.format('DD/MM/YYYY') : '';
  }

  listAcuerdosPagos() {
    this.acuerdosPagosService.getAcuerdosPagos().subscribe(
      (response: any) => {
        console.log(response.result);
        //Data Tables
        this.acuerdosPagos = response.result.map((item: any) => ({
          id: item.id,
          fecha: this.formatFecha(item.fecha),
          description: item.description,
          valor: item.valor,
          estado: item.estado,
          AcuerdosPagosAsAcudiente: item.AcuerdosPagosAsAcudiente,
          datosAcudiente: `${item.AcuerdosPagosAsAcudiente.nombres} ${item.AcuerdosPagosAsAcudiente.apellidos} (${item.AcuerdosPagosAsAcudiente.identificacion})`
        }));
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  
}
