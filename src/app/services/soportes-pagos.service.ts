import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class SoportesPagosService {
  constructor(private _htpp:HttpClient) { }

  crearSoportePago(data:any){
    return this._htpp.post<any>(base_url+'soportePagos/crearSoportePago/',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  misSoportesPagos(params:any){
    return this._htpp.get<any>(base_url+'soportePagos/listarMisSoportesPagos/'+params)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  misSoportesPagosSearch(params:any,idAcudiente:any){
    return this._htpp.get<any>(base_url+`soportePagos/listarMisSoportesPagosSearch/${encodeURIComponent(params)}/${idAcudiente}`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
