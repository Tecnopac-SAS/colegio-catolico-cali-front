import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class acuerdosPagos {
  constructor(private _htpp:HttpClient) { }

  getMatriculaAndPensionValue(id: any){
    return this._htpp.get<any>(base_url+'acuerdos-pagos/listarMatriculaAndPensionValue/'+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getAcuerdosPagos(){
    return this._htpp.get<any>(base_url+'acuerdos-pagos/listarAcuerdosPagos')
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getAcuerdoPago(id: any){
    return this._htpp.get<any>(base_url+'acuerdos-pagos/listarAcuerdoPago/'+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getAcuerdoPagoCuotas(id: any){
    return this._htpp.get<any>(base_url+'acuerdos-pagos/listarAcuerdoPagoCuotas/'+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getAcuerdoPagoByAcudiente(id: any){
    return this._htpp.get<any>(base_url+'acuerdos-pagos/listarAcuerdoPagoByAcudiente/'+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getAcuerdoPagoSearch(params:any,idAcudiente:any){
    return this._htpp.get<any>(base_url+`acuerdos-pagos/AcuerdoPago/${encodeURIComponent(params)}/${idAcudiente}`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  crearAcuerdoPago(data: any){
    return this._htpp.post<any>(base_url+'acuerdos-pagos/AcuerdoPago', data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  editarAcuerdoPago(data: any, id: any){
    return this._htpp.put<any>(base_url+'acuerdos-pagos/AcuerdoPago/'+id, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
