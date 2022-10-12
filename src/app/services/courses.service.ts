import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private _htpp:HttpClient) { }

  listCourses(){
    return this._htpp.get<any>(base_url+'course/listarCourses')
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  listCourse(params:any){
    return this._htpp.get<any>(base_url+'course/listarCourse/'+params)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  createCourse(data:any){
    return this._htpp.post<any>(base_url+'course/Crearcourse',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateCourse(id:any, data:any){
    return this._htpp.put<any>(base_url+'course/actualizarCourse/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
