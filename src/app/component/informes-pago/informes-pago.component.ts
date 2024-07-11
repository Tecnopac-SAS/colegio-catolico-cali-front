import { Component, OnInit, Input } from '@angular/core';
import { SoportesPagosService } from 'src/app/services/soportes-pagos.service';
import { documentosService } from 'src/app/services/documentos.service';
import { CurrencyUtils } from 'src/utils/currencyUtils';
import * as XLSX from 'xlsx';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-informes-pago',
  templateUrl: './informes-pago.component.html',
  styleUrls: ['./informes-pago.component.css']
})
export class InformesPagoComponent implements OnInit {

  //Excel
  name = 'ExcelSheet.xlsx';

  //Filters
  filterInput: string = '';
  filteredData: any[] = [];
  columns: Array<any> = ['#','Código','Acudiente','Módulo/Tipo','Fecha','Vía de pago','Monto','Descargar Soporte'] 
  filters: { [key: string]: string } = {};
  filterColumnsVisibility: { [key: string]: boolean } = {};

  navTitle="Informes de pago"
  listPagos: any;
  public filterText:any;
  documentData: any;
  noData: boolean = false;
  constructor(
    private soportesPagosService:SoportesPagosService,
    private documentosService: documentosService,
    private currencyUtils: CurrencyUtils,
    ) { 
    this.listPagosInit()
  }



  toggleColumnVisibility(col: string): void {
    this.filterColumnsVisibility[col] = !this.filterColumnsVisibility[col];
  }

  search(): void {
    let tempData = this.listPagos;

    // Filtrar por filtro general
    if (this.filterInput !== '') {
      tempData = tempData.filter((item: any) => {
        return Object.values(item).some((value: any) =>
          value.toString().toLowerCase().includes(this.filterInput.toLowerCase())
        );
      });
    }

    // Filtrar por cada columna visible
    Object.keys(this.filters).forEach(key => {
      if (this.filters[key] !== '' && this.filterColumnsVisibility[key]) {
        tempData = tempData.filter((item: any) => {
          let value = this.extractValue(item, key);
          return value.toString().toLowerCase().includes(this.filters[key].toLowerCase());
        });
      }
    });

    this.filteredData = tempData;
    this.noData = this.filteredData.length < 1 || this.listPagos.length < 1;
  }

  extractValue(item: any, key: string): any {
    switch (key) {
      case 'Código':
        return item.paymentCode;
      case 'Acudiente':
        return item.soportesPagosAsEstudiante.nombres + ' ' + item.soportesPagosAsEstudiante.apellidos + ' (' + item.soportesPagosAsEstudiante.identificacion + ')';
      case 'Módulo/Tipo':
        return item.tipoPago;
      case 'Fecha':
        return this.formatFecha(item.fecha);
      case 'Vía de pago':
        return item.viaPago;
      case 'Monto':
        return this.formatCurrency(item.monto);
      default:
        return '';
    }
  }


  ngOnInit(): void {
  }

  formatCurrency(amount: number): string {
    return this.currencyUtils.formatCurrency(amount);
  }

  listPagosInit(){
    this.soportesPagosService.allSoportesPagos().subscribe(response=>{
      console.log(response);
      if(response.result.length < 1){
        this.noData = true;
      }else{
        this.listPagos = response.result
        this.filteredData = response.result;
      }
    },error=>{

    });
  }


  exportToExcel(): void {
    const element = document.getElementById('data-table');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');
    
    // Convertir el libro a una matriz de bytes
    const excelBuffer: any = XLSX.write(book, { bookType: 'xlsx', type: 'array' });
  
    // Crear un blob con el contenido del archivo
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
    // Crear una URL de datos (data URL) para el blob
    const url = window.URL.createObjectURL(blob);
  
    // Crear un enlace en el documento
    const link = document.createElement('a');
    link.href = url;
    link.download = this.navTitle+'.xlsx'; // Nombre del archivo de Excel
    link.click();
  
    // Liberar el recurso de la URL de datos después de la descarga
    window.URL.revokeObjectURL(url);
  }
  
  descargaSoporte(data: any){
    this.documentData = {
      paymentCode: data.paymentCode,
      soporte_pago_monto: data.monto,
      soporte_pago_concepto: data.viaPago
    }
    this.documentosService.crearPDFDocumento(this.documentData, 8).subscribe(res => {
      window.location.href = res.pdfDownloadUrl;
    });
  }
  formatFecha(fecha: any) {
    const fechaColombia = moment(fecha).tz('America/Bogota');
    return fechaColombia.isValid() ? fechaColombia.format('DD/MM/YYYY - HH:mm:ss') : '';
  }
}
