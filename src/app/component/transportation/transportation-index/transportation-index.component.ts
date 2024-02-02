import { Component, OnInit } from '@angular/core';
import { TransportationService } from 'src/app/services/transportation.service';
import { TransportationRequestService } from 'src/app/services/transportationRequest.service';
import { StudentDatabaseService } from 'src/app/services/student-database.service';
import { AcudienteService } from 'src/app/services/acudiente.service';
import { Transportation } from 'src/app/models/transportation.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CurrencyUtils } from 'src/utils/currencyUtils';
import Swal from 'sweetalert2';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-transportation-index',
  templateUrl: './transportation-index.component.html',
  styleUrls: ['./transportation-index.component.css']

})
export class TransportationIndexComponent implements OnInit {
  grade!: any;
  navTitle = 'Transporte';
  formValue!: FormGroup;
  editTransportation!: FormGroup;
  public dataTransportation: any;
  public dataTransportationRequests: any;
  public filter: any;
  public filterText: any;
  public rutaObtenida: any;
  TransportationModel: Transportation = new Transportation();
  id!: any;
  selectedToEditRouteReq: any;

  constructor(
    private formBuilder: FormBuilder,
    private transportationService: TransportationService,
    private StudentDatabaseService: StudentDatabaseService,
    private AcudienteService:AcudienteService,
    public currencyUtils: CurrencyUtils,
    private transportationRequestService: TransportationRequestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listTransportations();
    this.listTransportationsRequests();
    this.fieldCapture();
    this.fieldCaptureEditReq();
  }

  fieldCapture() {
    this.formValue = this.formBuilder.group({
      routeName: [''],
      routeNumber: [''],
      responsible: [''],
      direccion_recogida: [''],
      direccion_entrega: [''],
      jornada: [''],
      descripcion: [''],
      price: [''],
      isActive: [''],
    });
  }
  fieldCaptureEditReq() {
    this.editTransportation = this.formBuilder.group({
      routeid: [''],
      estado: [''],
    });
  }

  selectToEdit(id: any,){
    this.transportationRequestService.listSolicitudTransporte(id).subscribe((res) => {
      this.selectedToEditRouteReq = res.result[0];
    })
  }
  editTransportationReq(){
    const editTransportationReqData = {
      routeid: this.editTransportation.value.routeid, 
      estado: this.editTransportation.value.estado
    }
    this.transportationRequestService.aprobarSolicitud(editTransportationReqData, this.selectedToEditRouteReq.id).subscribe((res) => {
      Swal.fire({
        icon: res.status ? 'success' : 'error',
        title: res.mensaje,
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        } else if (result.isDenied) { }
      });
    })
  }


  listTransportations() {
    this.transportationService.listTransportesAll().subscribe((res) => {
      this.dataTransportation = res.result;
      console.log(this.dataTransportation);
    });
  }

  listStudentsRequest(id: any) {
    return this.StudentDatabaseService.obtenerStudentDatabase(id);
  }

  listAcudientesRequest(id: any) {
    return this.AcudienteService.listAcudiente(id);
  }
  
  listTransportationsRequests() {
    this.transportationRequestService.listSolicitudesTransportes().subscribe((res) => {
      this.dataTransportationRequests = res.result;

      console.log(this.dataTransportationRequests);
      

      const requestsWithStudentsAndGuardians = this.dataTransportationRequests.map((req: any) => {
        const studentRequest = this.listStudentsRequest(req.estudianteid).pipe(
          map((studentData) => {
            req.estudiante = studentData.result;
            return req;
          })
        );
        const guardianRequest = this.listAcudientesRequest(req.acudienteid).pipe(
          map((guardianData) => {
            req.acudiente = guardianData.result;
            return req;
          })
        );
  
        return forkJoin([studentRequest, guardianRequest]).pipe(
          map(() => req)
        );
      });
  
      forkJoin(requestsWithStudentsAndGuardians).subscribe((requests) => {
        this.dataTransportationRequests = requests;
      });

      console.log(this.dataTransportationRequests);
      
    });
  }

  search(searchForm: any) {
    if (this.filterText == '') {
      this.listTransportations();
    } else {
      this.transportationService.listTransporte(searchForm.value.filtro).subscribe((res) => {
        this.dataTransportation = res.result;
        console.log(res.result);
      });
    }
  }

  deshabilitar(data: any) {
    this.TransportationModel.isActive = data.isActive;
    if (data.isActive == 0) {
      this.TransportationModel.isActive = 1;
      Swal.fire('Transporte habilitado!', '', 'success');
    } else if (data.isActive == 1) {
      this.TransportationModel.isActive = 0;
      Swal.fire('Transporte deshabilitado!', '', 'warning');
    }
    this.transportationService.deshabilitar(this.TransportationModel, data.id).subscribe((res) => {
      this.listTransportations();
    });
  }

}
