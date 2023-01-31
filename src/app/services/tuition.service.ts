import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Tuition } from '../models/tuition.model';
const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class TuitionService {

  constructor(private _htpp:HttpClient) { }

  listTuitions(){
    return this._htpp.get<any>(base_url+'tuitionType/listarTuitionTypes')
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  listTuition(params:any){
    return this._htpp.get<any>(base_url+'tuitionType/listarTuition/'+params)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  obtenerTuition(id:number){
    return this._htpp.get<any>(base_url+'tuitionType/listarTuitionId/'+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  listGrades(){
    return this._htpp.get<any>(base_url+'grades/listarGrades')
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  createTuition(data:any){
    return this._htpp.post<any>(base_url+'tuitionType/CrearTuitionType',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateTuition(id:any, data:any){
    return this._htpp.put<any>(base_url+'tuitionType/actualizarTuition/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  deshabilitar(data:any, id:number,){
    return this._htpp.put<any>(base_url+'tuitionType/deshabilitar/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  pagoMatricula(data:any){
    return this._htpp.post<any>(base_url+'pagoMatricula/CrearPago',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getPagoMatricula(data:any){
    return this._htpp.post<any>(base_url+'pagoMatricula/GetPago',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
