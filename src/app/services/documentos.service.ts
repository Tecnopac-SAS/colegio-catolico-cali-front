import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class documentosService {
  constructor(private _htpp:HttpClient) { }

  getDocumentos(){
    return this._htpp.get<any>(base_url+'documentos/listarDocumentos')
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getDocumento(id: any){
    return this._htpp.get<any>(base_url+'documentos/listarDocumentos/'+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  crearDocumento(data: any){
    return this._htpp.post<any>(base_url+'documentos/crearDocumentos', data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  editarDocumento(data: any, id: any){
    return this._htpp.put<any>(base_url+'documentos/actualizarDocumento/'+id, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  crearPDFDocumento(data: any, id: any){
    return this._htpp.post<any>(base_url+'documentos/crearPDFDocumento/'+id, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
