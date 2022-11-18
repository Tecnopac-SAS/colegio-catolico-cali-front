import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private _htpp:HttpClient) { }

  listTeachers(){
    return this._htpp.get<any>(base_url+'teacher/listarTeachers')
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  listTeacher(params:any){
    return this._htpp.get<any>(base_url+'teacher/listarTeacher/'+params)
    .pipe(map((res:any)=>{
      return res;
    }))
  }



  obtenerTeacher(id:number){
    return this._htpp.get<any>(base_url+'teacher/listarteacherId/'+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  createTeacher(data:any){
    return this._htpp.post<any>(base_url+'teacher/CrearTeacher',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateTeacher(data:any, id:number,){
    return this._htpp.put<any>(base_url+'teacher/actualizarTeacher/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deshabilitar(data:any, id:number,){
    return this._htpp.put<any>(base_url+'teacher/deshabilitar/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
