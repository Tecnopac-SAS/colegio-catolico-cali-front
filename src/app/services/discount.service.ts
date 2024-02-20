import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor(private _htpp:HttpClient) { }

  listDiscounts(){
    return this._htpp.get<any>(base_url+'discount/listarDiscounts')
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  listDiscount(params:any){
    return this._htpp.get<any>(base_url+'discount/listarDiscount/'+params)
    .pipe(map((res:any)=>{
      return res;
    }))
  }



  obtenerDiscount(id:number){
    return this._htpp.get<any>(base_url+'discount/listarDiscountId/'+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  createDiscount(data:any){
    return this._htpp.post<any>(base_url+'discount/CrearDiscount',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateDiscount(data:any, id:number,){
    return this._htpp.put<any>(base_url+'discount/actualizarDiscount/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deshabilitar(data:any, id:number,){
    return this._htpp.put<any>(base_url+'discount/deshabilitar/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  eliminar(data:any, id:number,){
    return this._htpp.put<any>(base_url+'discount/eliminar/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
