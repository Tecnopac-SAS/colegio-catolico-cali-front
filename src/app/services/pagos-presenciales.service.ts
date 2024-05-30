import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PagosPresencialesService {
  constructor(private _http:HttpClient) { }

  crearPagoPresencial(data:any){
    return this._http.post<any>(base_url+'pagosPresenciales/pagar',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  actualizarPagoPresencial(id: any, data:any){
    return this._http.put<any>(base_url+'pagosPresenciales/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  actualizarEstadoPagoPresencial(id: any, data:any){
    return this._http.put<any>(base_url+'pagosPresenciales/status/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  misPagosPresenciales(){
    return this._http.get<any>(base_url+'pagosPresenciales/list')
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
