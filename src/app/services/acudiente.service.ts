import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class AcudienteService {

  constructor(private _htpp:HttpClient) { }
  
  listAcudiente(idAcudiente:any):Observable<any>{
    console.log(idAcudiente);
    let json = {idAcudiente}
    let headers = new HttpHeaders().set('Content-Type','application/json')
    return this._htpp.post(base_url +'acudiente/getAcudiente',json,{headers:headers})
  }
  actualizarAcudiente(data: any) {
    return this._htpp.post<any>(base_url+'acudiente/actualizarAcudiente', data)
      .pipe(map((res:any)=>{
        return res;
      }))
    }
  }
