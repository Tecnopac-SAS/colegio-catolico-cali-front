import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class DeudasService {

  constructor(private _htpp:HttpClient) { }

  consultarDeudas(){
    return this._htpp.get<any>(base_url+'deudas/listarDeudas')
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  consultarDeuda(id: any){
    return this._htpp.get<any>(base_url+'deudas/listarDeuda/'+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  consultarMisDeudas(idAcudiente: any){
    return this._htpp.get<any>(base_url+'deudas/listarMisDeudas/'+idAcudiente)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  crearDeuda(data:any){
    return this._htpp.post<any>(base_url+'deudas/crearDeudas',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  editarDeuda(data: any, id: any){
    return this._htpp.put<any>(base_url+'deudas/editarDeuda/'+id, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
