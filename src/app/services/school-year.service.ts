import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class SchoolYearService {

  constructor(private _htpp:HttpClient) { }

  listSchoolYears(){
    return this._htpp.get<any>(base_url+'schoolYear/listarSchoolYears')
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  listSchoolYear(params:any){
    return this._htpp.get<any>(base_url+'schoolYear/listarSchoolYear/'+params)
    .pipe(map((res:any)=>{
      return res;
    }))
  }



  obtenerSchoolYear(id:number){
    return this._htpp.get<any>(base_url+'schoolYear/listarSchoolYearId/'+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  createSchoolYear(data:any){
    return this._htpp.post<any>(base_url+'schoolYear/crearSchoolYear',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateSchoolYear(data:any, id:number,){
    return this._htpp.put<any>(base_url+'schoolYear/actualizarSchoolYear/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deshabilitar(data:any, id:number,){
    return this._htpp.put<any>(base_url+'schoolYear/deshabilitar/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  cambioAnioLectivo2(){
    return this._htpp.put<any>(base_url+'schoolYear/actualizarAnioLectivo/','')
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  cambioAnioLectivo(user: any,getToken=null):Observable<any>{
    let json = user;
    if(getToken!=null){
      user.token= true
    }
    let headers = new HttpHeaders().set('Content-Type','application/json')
    //return this._htpp.put(base_url +'schoolYear/actualizarAnioLectivo/'+id,data)
    return this._htpp.post(base_url +'schoolYear/actualizarAnioLectivo',json,{headers:headers})

  }
}
//return this._htpp.put<any>(base_url+'schoolYear/actualizarSchoolYear/'+id,data)

