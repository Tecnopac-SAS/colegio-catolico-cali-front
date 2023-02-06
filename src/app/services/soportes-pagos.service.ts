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

  misSoportesPagos(params:any){
    return this._htpp.get<any>(base_url+'soportePagos/listarMisSoportesPagos/'+params.idEstudiante)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  misSoportesPagosSearch(params:any,idEstudiante:any){
    return this._htpp.get<any>(base_url+`soportePagos/listarMisSoportesPagosSearch/${encodeURIComponent(params)}/${idEstudiante}`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
