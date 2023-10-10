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
  
  amountToWords(numero: number): string {
    const unidades = ['', 'UNO', 'DOS', 'TRES', 'CUATRO', 'CINCO', 'SEIS', 'SIETE', 'OCHO', 'NUEVE'];
    const decenas = ['', 'DIEZ', 'VEINTE', 'TREINTA', 'CUARENTA', 'CINCUENTA', 'SESENTA', 'SETENTA', 'OCHENTA', 'NOVENTA'];
    const especiales = ['', 'ONCE', 'DOCE', 'TRECE', 'CATORCE', 'QUINCE'];
    const centenas = ['', 'CIENTO', 'DOSCIENTOS', 'TRESCIENTOS', 'CUATROCIENTOS', 'QUINIENTOS', 'SEISCIENTOS', 'SETECIENTOS', 'OCHOCIENTOS', 'NOVECIENTOS'];
  
    function convertirUnidades(num: number): string {
      return unidades[num];
    }
  
    function convertirDecenas(num: number): string {
      if (num < 10) {
        return convertirUnidades(num);
      } else if (num === 10) {
        return 'DIEZ';
      } else if (num < 20) {
        return especiales[num - 10];
      } else {
        const decena = Math.floor(num / 10);
        const unidad = num % 10;
        return decenas[decena] + (unidad > 0 ? ` Y ${convertirUnidades(unidad)}` : '');
      }
    }
  
    function convertirCentenas(num: number): string {
      if (num === 100) {
        return 'CIEN';
      } else {
        const centena = Math.floor(num / 100);
        const decena = num % 100;
        return centenas[centena] + (decena > 0 ? ` ${convertirDecenas(decena)}` : '');
      }
    }
  
    function convertirMillones(numero: number): string {
      if (numero < 1000000) {
        return convertirMiles(numero);
      } else {
        const millones = Math.floor(numero / 1000000);
        const miles = numero % 1000000;
        const millonesEnLetras = convertirCentenas(millones) + ' MILLONES';
        if (miles > 0) {
          return `${millonesEnLetras} ${convertirMiles(miles)}`;
        } else {
          return millonesEnLetras;
        }
      }
    }
  
    function convertirMiles(numero: number): string {
      if (numero < 1000) {
        return convertirCentenas(numero);
      } else {
        const miles = Math.floor(numero / 1000);
        const centenas = numero % 1000;
        const milesEnLetras = convertirCentenas(miles) + ' MIL';
        if (centenas > 0) {
          return `${milesEnLetras} ${convertirCentenas(centenas)}`;
        } else {
          return milesEnLetras;
        }
      }
    }
  
    if (numero === 0) {
      return 'CERO';
    } else if (numero < 0) {
      return 'MENOS ' + this.amountToWords(-numero);
    } else if (numero < 100) {
      return convertirDecenas(numero);
    } else if (numero < 1000) {
      return convertirCentenas(numero);
    } else if (numero < 1000000) {
      return convertirMiles(numero);
    } else if (numero < 1000000000) { // Hasta mil millones
      return convertirMillones(numero);
    } else {
      return 'NÚMERO DEMASIADO GRANDE PARA SER CONVERTIDO';
    }
  }
  
}
