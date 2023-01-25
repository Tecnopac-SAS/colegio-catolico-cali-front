import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PensionPagoService {

  constructor(private _htpp:HttpClient) { }

  listPension(data:any){
    return this._htpp.post<any>(base_url+'pago-pension/list',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
