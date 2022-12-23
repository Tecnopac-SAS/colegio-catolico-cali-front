import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class StudentDatabaseService {

  constructor(private _htpp:HttpClient) { }

  listStudentDatabases(){
    return this._htpp.get<any>(base_url+'studentDatabase/listarstudentDatabases')
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  listStudentDatabase(params1:any,params2:any){
    return this._htpp.get<any>(base_url+'studentDatabase/listarstudentDatabase/'+params1+'/'+params2)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  listStudentDatabaseTipo(params:any){
    return this._htpp.get<any>(base_url+'studentDatabase/listarStudentDatabaseEstado/'+params)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  listStudentDatabaseTipoCount(params:any){
    return this._htpp.get<any>(base_url+'studentDatabase/contarEstado/'+params)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  obtenerStudentDatabase(id:number){
    return this._htpp.get<any>(base_url+'studentDatabase/listarstudentDatabaseId/'+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  createStudentDatabase(data:any){
    return this._htpp.post<any>(base_url+'studentDatabase/CrearstudentDatabase',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateStudentDatabase(data:any, id:number,){
    return this._htpp.put<any>(base_url+'studentDatabase/actualizarstudentDatabase/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateStudentDatabaseEstado(data:any, id:number,){
    return this._htpp.put<any>(base_url+'studentDatabase/cambiarEstado/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deshabilitar(data:any, id:number,){
    return this._htpp.put<any>(base_url+'studentDatabase/deshabilitar/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  createHistorialAcademico(data:any){
    return this._htpp.post<any>(base_url+'historialAcademico/CrearHistorialAcademico',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  createAptitudes(data:any){
    return this._htpp.post<any>(base_url+'aptitudes/crearAptitudes',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  createPadre(data:any){
    return this._htpp.post<any>(base_url+'padres-familia/crearPadreFamilia',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  createMadre(data:any){
    return this._htpp.post<any>(base_url+'padres-familia/crearMadreFamilia',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  createAcudiente(data:any){
    return this._htpp.post<any>(base_url+'padres-familia/crearAcudiente',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  createResponsable(data:any){
    return this._htpp.post<any>(base_url+'padres-familia/crearResponsable',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  createHermanos(data:any){
    return this._htpp.post<any>(base_url+'hermanos/crearHermano',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

}
