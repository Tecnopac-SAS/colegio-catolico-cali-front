import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor(private _htpp:HttpClient) { }

  listCertificates(){
    return this._htpp.get<any>(base_url+'certificate/listarCertificates')
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  listCertificate(params:any){
    return this._htpp.get<any>(base_url+'certificate/listarCertificate/'+params)
    .pipe(map((res:any)=>{
      return res;
    }))
  }



  obtenerCertificate(id:number){
    return this._htpp.get<any>(base_url+'certificate/listarCertificateId/'+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  createCertificate(data:any){
    return this._htpp.post<any>(base_url+'certificate/CrearCertificate',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateCertificate(data:any, id:number,){
    return this._htpp.put<any>(base_url+'certificate/actualizarcertificate/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deshabilitar(data:any, id:number,){
    return this._htpp.put<any>(base_url+'certificate/deshabilitar/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
