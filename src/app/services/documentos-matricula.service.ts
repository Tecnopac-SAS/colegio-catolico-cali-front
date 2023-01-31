import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
const base_url = environment.url;
@Injectable({
  providedIn: 'root'
})
export class DocumentosMatriculaService {

  constructor(private _htpp:HttpClient) { }

  listDocumentosMatriculas(){
    return this._htpp.get<any>(base_url+'documentosMatricula')
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  listDocumentosMatricula(params:any){
    return this._htpp.get<any>(base_url+'documentosMatricula/listarDocumentosMatricula/'+params)
    .pipe(map((res:any)=>{
      return res;
    }))
  }



  obtenerDocumentosMatricula(id:number){
    return this._htpp.get<any>(base_url+'documentosMatricula/'+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  createDocumentosMatricula(data:any){
    return this._htpp.post<any>(base_url+'documentosMatricula',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateDocumentosMatricula(data:any, id:number,){
    return this._htpp.put<any>(base_url+'documentosMatricula/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deshabilitar(data:any, id:number,){
    return this._htpp.put<any>(base_url+'documentosMatricula/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  listDocumentosMatriculaByStudent(id:number,){
    return this._htpp.get<any>(base_url+'documentosMatricula/student/'+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
