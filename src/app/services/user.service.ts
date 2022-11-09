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

  public name: any;
  public role: any;
  public id: any;

  constructor( private _htpp:HttpClient,) { }

  createUser(data:any){
    return this._htpp.post<any>(base_url+'user/agregarUsuario',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  listUsers(){
    return this._htpp.get<any>(base_url+'user/listarUsuarios')
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  obtenerUsuario(params:any){
    return this._htpp.get<any>(base_url+'user/listarUsuario/'+params)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateUser(id:any, data:any){
    return this._htpp.put<any>(base_url+'user/actualizarUsuario/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updatePassword(id:any, data:any){
    return this._htpp.put<any>(base_url+'user/nuevaContrasena/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getRoles(){
    return this._htpp.get<any>(base_url+'role/listarRoles')
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getRol():Observable<any>{
    let role = localStorage.getItem('idRole');
    if(role){
      this.role = role
    }
    else {
      this.role= null;
    }
    return this.role;
  }

  getName():Observable<any>{
    let name = localStorage.getItem('usuario');
    if(name){
      this.name = name
    }
    else {
      this.name= null;
    }
    return this.name;
  }

  getId():Observable<any>{
    let id = localStorage.getItem('id');
    if(id){
      this.id = id
    }
    else {
      this.id= null;
    }
    return this.id;
  }

}
