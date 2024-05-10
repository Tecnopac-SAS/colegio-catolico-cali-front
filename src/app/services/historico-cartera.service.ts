import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class HistoricoCarteraService {
  constructor(private _htpp:HttpClient) { }

  historicoCarteraIndex(params:any){
    return this._htpp.get<any>(base_url+'historicoCartera/listarHistoricoCartera/'+params.idAcudiente)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  totalDeuda(params:any){
    return this._htpp.get<any>(base_url+'historicoCartera/totalDeuda/'+params.idAcudiente)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  totalDeudas(){
    return this._htpp.get<any>(base_url+'historicoCartera/totalDeudas')
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  historicoCarteraSearch(params:any,idAcudiente:any){
    return this._htpp.get<any>(base_url+`historicoCartera/listarHistoricoCarteraSearch/${encodeURIComponent(params)}/${idAcudiente}`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
