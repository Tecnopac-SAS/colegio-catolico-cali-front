import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class LoncheraService {

  constructor(private _htpp:HttpClient) { }
  
  pagar(data:any,idAcudiente:any):Observable<any>{
    let json = {data,idAcudiente}
    let headers = new HttpHeaders().set('Content-Type','application/json')
    return this._htpp.post(base_url +'cafeteriaPagos/crearPago',json,{headers:headers})
  }
  getCant(idAcudiente:any):Observable<any>{
    let json = {idAcudiente}
    let headers = new HttpHeaders().set('Content-Type','application/json')
    return this._htpp.post(base_url +'cafeteriaPagos/getPagos',json,{headers:headers})
  }
}
