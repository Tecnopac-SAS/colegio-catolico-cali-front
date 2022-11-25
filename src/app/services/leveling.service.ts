import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class LevelingService {

  constructor(private _htpp:HttpClient) { }

  listLevelings(){
    return this._htpp.get<any>(base_url+'leveling/listarLevelings')
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  listLeveling(params:any){
    return this._htpp.get<any>(base_url+'leveling/listarLeveling/'+params)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  
  listLevelingTipo(params:any){
    return this._htpp.get<any>(base_url+'leveling/listarLevelingEstado/'+params)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  obtenerLeveling(id:number){
    return this._htpp.get<any>(base_url+'leveling/listarLevelingId/'+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  createLeveling(data:any){
    return this._htpp.post<any>(base_url+'leveling/CrearLeveling',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateLeveling(data:any, id:number,){
    return this._htpp.put<any>(base_url+'leveling/actualizarLeveling/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateLevelingEstado(data:any, id:number,){
    return this._htpp.put<any>(base_url+'leveling/cambiarEstado/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deshabilitar(data:any, id:number,){
    return this._htpp.put<any>(base_url+'leveling/deshabilitar/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
