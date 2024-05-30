import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class TransportationService {

  constructor(private _htpp:HttpClient) { }

  listTransportes(jornada:any){
    return this._htpp.get<any>(base_url+'transportation/listarTransportations/'+jornada)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  listTransportesAll(){
    return this._htpp.get<any>(base_url+'transportation/listarTransportations/')
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  listTransporte(params:any){
    return this._htpp.get<any>(base_url+'transportation/listarTransportation/'+params)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  obtenerTransporte(id:number){
    return this._htpp.get<any>(base_url+'transportation/listarTransportationId/'+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  createTransporte(data:any){
    return this._htpp.post<any>(base_url+'transportation/CrearTransportation',data)
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

  deshabilitar(data:any, id:number,){
    return this._htpp.put<any>(base_url+'transportation/deshabilitar/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
