import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  //declaración de variables aux
  public user: any;
  public token: any;

  constructor(
    private _htpp:HttpClient,
  ) { }

  login(user: any,getToken=null):Observable<any>{
    let json = user;
    if(getToken!=null){
      user.token= true

    }
    let headers = new HttpHeaders().set('Content-Type','application/json')
    return this._htpp.post(base_url +'user/login',json,{headers:headers})

  }

  generarCaptcha(){
    return this._htpp.get<any>(base_url+'user/generarCaptcha')
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  recuperarContrasena(params:any){
    return this._htpp.get<any>(base_url+'user/recuperarPass/'+params)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getToken():Observable<any>{
    let token = localStorage.getItem('token');
    if(token){
      this.token = token
    }

    else {
      this.token= null;
    }

    return this.token;
  }
}
