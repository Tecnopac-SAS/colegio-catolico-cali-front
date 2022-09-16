import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/user.models';
const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private _htpp:HttpClient,) { }

  createUser(data:any){
    return this._htpp.post<any>(base_url+'user/agregarUsuario',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

}
