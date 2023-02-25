import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class LoncheraService {

  constructor(private _htpp:HttpClient) { }
  
  pagar(data:any,idAcudiente:any,idEstudiante:any):Observable<any>{
    let json = {data,idAcudiente,idEstudiante}
    let headers = new HttpHeaders().set('Content-Type','application/json')
    return this._htpp.post(base_url +'cafeteriaPagos/crearPago',json,{headers:headers})
  }
  getPagos(){
    return this._htpp.get<any>(base_url+'cafeteriaPagos/getPagos')
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  entregarTarjeta(id:number){
    return this._htpp.get<any>(base_url+`cafeteriaPagos/entregarTarjeta/${id}`)
  }
  listPagoSearch(params:any){
    return this._htpp.get<any>(base_url+'cafeteriaPagos/listPagoSearch/'+encodeURIComponent(params))
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  // getPagos(idAcudiente:any):Observable<any>{
  //   let json = {idAcudiente}
  //   let headers = new HttpHeaders().set('Content-Type','application/json')
  //   return this._htpp.post(base_url +'cafeteriaPagos/getPagos',json,{headers:headers})
  // }
}
