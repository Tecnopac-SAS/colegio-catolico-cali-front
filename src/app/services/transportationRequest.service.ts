import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class TransportationRequestService {

  constructor(private _htpp:HttpClient) { }

  listSolicitudesTransportes(){
    return this._htpp.get<any>(base_url+'transportationRequest/listarTransportationsRequests')
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  listSolicitudesEstudianteTransportes(estudianteid: any, acudienteid: any){
    return this._htpp.get<any>(base_url+'transportationRequest/listarTransportationsRequests/'+estudianteid+'/'+acudienteid)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  createTransporteSolicitud(data:any){
    return this._htpp.post<any>(base_url+'transportationRequest/crearTransportationRequest',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateTransporte(data:any, id:number,){
    return this._htpp.put<any>(base_url+'transportation/actualizarTransportation/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  aprobarCupo(data:any, id:number,){
    return this._htpp.put<any>(base_url+'transportationRequest/aprobarCupo/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
