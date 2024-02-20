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

  obtenerExtracurricular(id:number){
    return this._htpp.get<any>(base_url+'extracurricular/listarExtracurricularId/'+id)
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
  misExtracurriculares(data:any){
    return this._htpp.post<any>(base_url+'extracurricular/misExtracurriculares',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  pagoExtracurricular(data:any){
    return this._htpp.post<any>(base_url+'extracurricular/pago',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  createExtracurricularFile(data:any){
    const fd = new FormData();
    fd.append('imagen',data.imagen);
    fd.append('startDate',data.startDate);
    fd.append('finalDate',data.finalDate);
    fd.append('idTeacher',data.idTeacher);
    fd.append('activity',data.activity);
    fd.append('price',data.price);
    fd.append('isActive',data.isActive);
    fd.append('information',data.information);
    fd.append('schedule',data.schedule);
    return this._htpp.post(base_url+'extracurricular/CrearExtracurricular',fd);
  }

  updateExtracurricular(data:any,id:any){
    return this._htpp.put<any>(base_url+'extracurricular/actualizarExtracurricular/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deshabilitar(data:any, id:number,){
    return this._htpp.put<any>(base_url+'extracurricular/deshabilitar/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  desvincularse(data:any, id:number,){
    return this._htpp.put<any>(base_url+'extracurricular/desvincularse/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

}
