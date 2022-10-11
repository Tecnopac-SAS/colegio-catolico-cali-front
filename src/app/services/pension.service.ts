import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Pension } from '../models/pension.model';
const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PensionService {

  constructor(private _htpp:HttpClient) { }

  listPensiones(){
    return this._htpp.get<any>(base_url+'pension/listarPensiones')
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  listPension(params:any){
    return this._htpp.get<any>(base_url+'pension/listarPension/'+params)
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

  createPension(data:any){
    return this._htpp.post<any>(base_url+'pension/CrearPension',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updatePension(id:any, data:any){
    return this._htpp.put<any>(base_url+'pension/actualizarPension/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
