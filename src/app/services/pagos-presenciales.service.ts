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
  constructor(private _htpp:HttpClient) { }

  crearPagoPresencial(data:any){
    return this._htpp.post<any>(base_url+'pagosPresenciales/pagar',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  misPagosPresenciales(){
    return this._htpp.get<any>(base_url+'pagosPresenciales/list')
    .pipe(map((res:any)=>{
      return res;
    }))
  }

}
