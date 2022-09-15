import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
