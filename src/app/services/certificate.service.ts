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
  listCertificatesAcu(){
    return this._htpp.get<any>(base_url+'certificate/listarCertificatesAcu')
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  listCertificatesInscription(id:any){
    return this._htpp.get<any>(base_url+`certificate/listCertificatesInscription/${id}`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  listCertificatesInscriptionAll(){
    return this._htpp.get<any>(base_url+`certificate/listCertificatesInscription`)
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
  createDocumentoCertificate(data:any){
    return this._htpp.post<any>(base_url+'certificate/createDocumentoCertificate',data)
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
  pagoInscripcion(data:any){
    return this._htpp.post<any>(base_url+'certificate/pago',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  listCertificatesInscriptionAllSearch(data:any,id:any){
    return this._htpp.get<any>(base_url+`certificate/inscriptionAllSearch/${encodeURIComponent(data)}/${id}`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  statusChange(data:any, id:number,){
    return this._htpp.put<any>(base_url+'certificate/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  obtenerCertificateInscription(id:number){
    return this._htpp.get<any>(base_url+'certificate/certificateInscriptionId/'+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
