import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Period } from '../models/period.model';
const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PeriodService {

  constructor(private _htpp:HttpClient) { }

  listPeriod(){
    return this._htpp.get<any>(base_url+'period/listarPeriodos')
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  createPeriod(data:any){
    return this._htpp.post<any>(base_url+'period/CrearPeriodo',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getPeriod(){
    return this._htpp.get<any>(base_url+'period/listarPeriodo')
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
