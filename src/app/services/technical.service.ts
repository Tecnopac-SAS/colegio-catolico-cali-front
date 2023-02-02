import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class TechnicalService {

  constructor(private _htpp:HttpClient) { }

  listTechnicals(){
    return this._htpp.get<any>(base_url+'technical/listarTechnicals')
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  listTechnical(params:any){
    return this._htpp.get<any>(base_url+'technical/listarTechnical/'+params)
    .pipe(map((res:any)=>{
      return res;
    }))
  }



  obtenerTechnical(id:number){
    return this._htpp.get<any>(base_url+'technical/listarTechnicalId/'+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  createTechnical(data:any){
    return this._htpp.post<any>(base_url+'technical/CrearTechnical',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateTechnical(data:any, id:number,){
    return this._htpp.put<any>(base_url+'technical/actualizarTechnical/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deshabilitar(data:any, id:number,){
    return this._htpp.put<any>(base_url+'technical/deshabilitar/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  pagoMedia(data:any){
    return this._htpp.post<any>(base_url+'technical/pago',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
