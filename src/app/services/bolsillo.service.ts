import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class BolsilloService {

  constructor(private _htpp:HttpClient) { }

  descuento(data: any){
    return this._htpp.post<any>(base_url+'acudiente/descBolsillo', data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getCant(idAcudiente:any){
    return this._htpp.post<any>(base_url+'acudiente/getBolsillo', {idAcudiente: idAcudiente})
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  recarga(cant:any,idAcudiente:any){
    return this._htpp.post<any>(base_url+'acudiente/addBolsillo', {idAcudiente: idAcudiente, cant: cant})
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
