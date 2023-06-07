import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class AvalPayService {

  constructor(private _http:HttpClient) { }

  makePayment(amount:number,invoiceType:number, portalURL: string ,desc:string): Observable<any> {
    const url = `${base_url}avalpay/payment`; // Reemplaza '/payment' con la URL real de destino
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  
    return this._http.post<any>(url, {
      "amount": amount,
      "invoiceType": invoiceType,
      "portalURL": portalURL,
      "desc": desc,
    }, httpOptions)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  makePaymentStatus(pmtId:any): Observable<any> {
    const url = `${base_url}avalpay/paymentStatus/${pmtId}`; // Reemplaza '/payment' con la URL real de destino
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.get<any>(url, httpOptions)
      .pipe(map((res: any) => {
          return res;
        })
      );
  }
}
