import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Inscription } from '../models/inscription.model';
const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  constructor(private _htpp:HttpClient) { }

  listInscription(){
    return this._htpp.get<any>(base_url+'grade/listarGrados')
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  createInscription(data:any){
    return this._htpp.post<any>(base_url+'grade/crearGrado',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

}
