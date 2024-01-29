import { Component, OnInit } from '@angular/core';
import { CurrencyUtils } from 'src/utils/currencyUtils';
import { DocumentosMatriculaService } from 'src/app/services/documentos-matricula.service';
import { documentosService } from 'src/app/services/documentos.service';
import { PensionPagoService } from 'src/app/services/pension-pago.service';
import { StudentDatabaseService } from 'src/app/services/student-database.service';
import { count } from 'rxjs/operators';
import * as moment from 'moment';


import Swal from 'sweetalert2';

@Component({
  selector: 'app-descarga-documento-matricula',
  templateUrl: './descarga-documento-matricula.component.html',
  styleUrls: ['./descarga-documento-matricula.component.css']
})
export class DescargaDocumentoMatriculaComponent implements OnInit {
  navTitle = 'Descarga de documentos';
  public listDoc: any;
  public docId: any;
  estudiante: any;
  docSelected: any;
  acudiente: any;
  data: any;
  pensionesList: any;
  tabla_pensiones_template: any;
  pension: any;

  constructor(
    private DocumentosMatriculaService: DocumentosMatriculaService,
    private pensionService: PensionPagoService,
    private CurrencyUtils: CurrencyUtils,
    private StudentDatabaseService: StudentDatabaseService,
    private documentosService: documentosService
  ) {
    moment.locale('es');
    this.pension = '';
    this.StudentDatabaseService.getPension().subscribe(response=>{
      this.pension = JSON.stringify(response.result.price)
    },error=>{});

    let data = { idAcudiente: localStorage.getItem('idAcudiente') };
    this.pensionService.listPension(data).subscribe(res => {
      this.pensionesList = res.result;
    });

    this.DocumentosMatriculaService.listDocumentosMatriculas().subscribe(res => {
      this.listDoc = res;
    });

    this.docId = '';
    this.StudentDatabaseService.obtenerStudentDatabase(Number(localStorage.getItem('idEstudiante'))).subscribe(response => {
      this.estudiante = response.result;
    });
  }

  ngOnInit(): void {
  }

  formatCurrency(amount: number): string {
    return this.CurrencyUtils.formatCurrency(amount);
  }

  amountToWords(amount: number): string {
    return this.CurrencyUtils.amountToWords(amount);
  }

  descargarDocumento() {
    let filasTabla = '';
    this.pensionesList.map((cuota: any) => {
      filasTabla += `
        <tr style="font-size: 13px;">
          <td style="font-size: 13px; text-align: center;">${cuota.id}</td>
          <td style="font-size: 13px; text-align: center; text-transform: capitalize;">${this.amountToWords(cuota.valor)} - ($ ${this.formatCurrency(cuota.valor)})</td>
          <td style="font-size: 13px; text-align: right;">${moment(cuota.fechaPago).format('D [de] MMMM [de] YYYY')}</td>
        </tr>`;
    });

    this.data = {
      acudiente_nombre: localStorage.getItem('usuario'),
      estudiante_nombre: `${this.estudiante.nombres} ${this.estudiante.apellidos}`,
      estudiante_grado: `${this.estudiante.grado}`,
      valor_matricula_letras: `${this.amountToWords(this.pension)}`,
      valor_matricula: `${this.formatCurrency(this.pension)}`,
      tabla_pensiones: `
      <style>
            table, th, td {
              border: 1px solid black;
              border-collapse: collapse;
            }
      </style>
        <table style="width: 95%; margin: auto; margin-top: 0.7rem;">
          <thead>
            <tr style="font-size: 13px; text-align: center;">
              <th>Cuota No.</th>
              <th>Valor cuota</th>
              <th>Fecha límite pago</th>
            </tr>
          </thead>
          <tbody>
            ${filasTabla}
          </tbody>
        </table>`,
        total_pensiones: this.pensionesList.length,
        total_pensiones_letras: this.amountToWords(this.pensionesList.length),
        mensualidad: this.formatCurrency(this.pensionesList[0]?.valor),
        mensualidad_letras: this.amountToWords(this.pensionesList[0]?.valor),
    };
    this.documentosService.crearPDFDocumento(this.data, this.docId).subscribe(res => {
      window.location.href = res.pdfDownloadUrl;
    });
  }
}
