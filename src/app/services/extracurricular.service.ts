import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Extracurricular } from '../models/extracurricular.model';
const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ExtracurricularService {

  constructor(private _htpp:HttpClient) { }

  listExtracurriculares(){
    return this._htpp.get<any>(base_url+'extracurricular/listarExtracurricular')
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  listExtracurricular(params:any){
    return this._htpp.get<any>(base_url+'extracurricular/listarExtracurricular/'+params)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  createExtracurricular(data:any){
    return this._htpp.post<any>(base_url+'extracurricular/CrearExtracurricular',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateExtracurricular(id:any, data:any){
    return this._htpp.put<any>(base_url+'tuitionType/actualizarTuition/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }


}
