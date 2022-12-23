import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class CanalReferenciaService {

  constructor(private _htpp:HttpClient) { }

  createCanalReferencia(data:any){
    return this._htpp.post<any>(base_url+'canalReferencia/CrearCanalReferencia',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
