import { Component, OnInit, Input, Output, EventEmitter , SimpleChanges } from '@angular/core';
import { CurrencyUtils } from 'src/utils/currencyUtils';
import * as XLSX from 'xlsx';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-search-filters-datatable',
  templateUrl: './search-filters-datatable.component.html',
  styleUrls: ['./search-filters-datatable.component.css']
})
export class SearchFiltersDatatableComponent implements OnInit {

  // Params
  @Input() navTitle: string = '';
  @Input() tempData: Array<any> = [];
  @Input() columns: Array<any> = [];
  @Input() filtersColumns: boolean = true;

  @Output() itemIdSelected: EventEmitter<number> = new EventEmitter<number>();

  // Filters
  filterInput: string = '';
  filteredData: Array<any> = [];
  filters: { [key: string]: string } = {};
  filterColumnsVisibility: { [key: string]: boolean } = {};
  filterColumnsFiltersVisibility: { [key: string]: boolean } = {};
  name = `${this.navTitle}.xlsx`;

  // Flags
  noData: boolean = false;
  isLoading: boolean = true;

  constructor(private currencyUtils: CurrencyUtils) { 
  }

  ngOnInit(): void {
    this.filteredData = this.tempData?.slice(); // Copia para no modificar el original
    this.initializeFilterVisibility();
    this.initializeColumnFilterVisibility();
    this.initializeFilters();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tempData && !changes.tempData.isFirstChange()) {
      this.filteredData = this.tempData.slice(); // Copia para no modificar el original
      setTimeout(() => {
        this.isLoading = false; // Los datos han llegado
      }, 500);
      this.applyFilters(); // Aplicar filtros si hay alguno
    }
  }

  initializeFilterVisibility(): void {
    this.columns.forEach(col => {
      this.filterColumnsFiltersVisibility[col.field] = false; // Inicializar visibilidad por campo
    });
  }
  initializeColumnFilterVisibility(): void {
    this.columns.forEach(col => {
      this.filterColumnsVisibility[col.field] = true; // Inicializar visibilidad por campo
    });
  }

  initializeFilters(): void {
    this.columns.forEach(col => {
      this.filters[col.field] = ''; // Inicializar filtros vacíos por campo
    });
  }

  toggleColumnFilterVisibility(col: string): void {
    this.filterColumnsFiltersVisibility[col] = !this.filterColumnsFiltersVisibility[col];
    this.applyFilters();
  }
  toggleColumnVisibility(col: string): void {
    this.filterColumnsVisibility[col] = !this.filterColumnsVisibility[col];
    this.applyFilters();
  }

  search(): void {
    console.log(this.tempData);
    this.applyFilters();
  }

  applyFilters(): void {
    console.log(this.tempData);
    // Resetear los datos filtrados al conjunto completo de datos
    this.filteredData = this.tempData.slice(); // Hacer una copia para no modificar el original

    // Filtrar por filtro general (input de búsqueda)
    if (this.filterInput !== '') {
      this.filteredData = this.filteredData.filter((item: any) => {
        return Object.values(item).some((value: any) =>
          value.toString().toLowerCase().includes(this.filterInput.toLowerCase())
        );
      });
    }

    // Filtrar por cada columna visible y su respectivo filtro
    Object.keys(this.filters).forEach(key => {
      if (this.filters[key] !== '' && this.filterColumnsVisibility[key]) {
        this.filteredData = this.filteredData.filter((item: any) => {
          let value = this.extractValue(item, key);
          return value.toString().toLowerCase().includes(this.filters[key].toLowerCase());
        });
      }
    });

    this.noData = this.filteredData.length < 1;
  }

  extractValue(item: any, key: string): any {
    return item[key] ?? '';
  }

  exportToExcel(): void {
    const element = document.getElementById('data-table');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, `${this.navTitle} - Hoja 1`);

    // Convertir el libro a una matriz de bytes
    const excelBuffer: any = XLSX.write(book, { bookType: 'xlsx', type: 'array' });

    // Crear un blob con el contenido del archivo
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Crear una URL de datos (data URL) para el blob
    const url = window.URL.createObjectURL(blob);

    // Crear un enlace en el documento
    const link = document.createElement('a');
    link.href = url;
    link.download = `${this.navTitle.replace(/\s+/g, '_').toLowerCase()}|${this.formatFecha(new Date())}.xlsx`; // Nombre del archivo de Excel
    link.click();
  }


  formatFecha(fecha: any) {
    const fechaColombia = moment(fecha).tz('America/Bogota');
    return fechaColombia.isValid() ? fechaColombia.format('DD/MM/YYYY') : '';
  }

  formatCurrency(amount: number): string {
    return this.currencyUtils.formatCurrency(amount);
  }
}
