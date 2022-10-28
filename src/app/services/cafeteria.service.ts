import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class CafeteriaService {

  constructor(private _htpp:HttpClient) { }

  listCafeterias(){
    return this._htpp.get<any>(base_url+'cafeteria/listarCafeterias')
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  listCafeteria(params:any){
    return this._htpp.get<any>(base_url+'cafeteria/listarCafeteria/'+params)
    .pipe(map((res:any)=>{
      return res;
    }))
  }



  obtenerCafeteria(id:number){
    return this._htpp.get<any>(base_url+'cafeteria/listarCafeteriaId/'+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  createCafeteria(data:any){
    return this._htpp.post<any>(base_url+'cafeteria/CrearCafeteria',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateCafeteria(data:any, id:number,){
    return this._htpp.put<any>(base_url+'cafeteria/actualizarCafeteria/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deshabilitar(data:any, id:number,){
    return this._htpp.put<any>(base_url+'cafeteria/deshabilitar/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
