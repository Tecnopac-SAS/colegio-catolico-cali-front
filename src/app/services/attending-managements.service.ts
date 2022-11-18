import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class AttendingManagementsService {
  constructor(private _htpp:HttpClient) { }

  listAttendingManagements(){
    return this._htpp.get<any>(base_url+'attendingManagements/listarAttendingManagements')
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  listAttendingManagement(params:any){
    return this._htpp.get<any>(base_url+'attendingManagements/listarAttendingManagement/'+params)
    .pipe(map((res:any)=>{
      return res;
    }))
  }



  obtenerAttendingManagement(id:number){
    return this._htpp.get<any>(base_url+'attendingManagements/listarAttendingManagementId/'+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  createAttendingManagement(data:any){
    return this._htpp.post<any>(base_url+'attendingManagements/CrearAttendingManagement',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateAttendingManagement(data:any, id:number,){
    return this._htpp.put<any>(base_url+'attendingManagements/actualizarAttendingManagement/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deshabilitar(data:any, id:number,){
    return this._htpp.put<any>(base_url+'attendingManagements/deshabilitar/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
