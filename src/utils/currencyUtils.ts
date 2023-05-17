import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyUtils {
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat("es-CO", {
      style: "decimal",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  }
}
