import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoCambioService {

  constructor(private http: HttpClient, private router: Router) { }

  update(monto: string):Observable<any>{
    const bParams = {
      "tipoCambioId": 1,
      "monedaOrigen": "USD",
      "monedaDestino": "SOL",
      "monto": monto
    }
    return this.http.put<any>(`${environment.url_service}/tipo-cambio/update`, bParams);
  }

  save(monto: string, monedaOrigen: string, monedaDestino: string):Observable<any>{
    const bParams = {
      "monto": monto,
      "monedaOrigen": monedaOrigen,
      "monedaDestino": monedaDestino
    }
    return this.http.post<any>(`${environment.url_service}/tipo-cambio/resultado-tipo-cambio`, bParams);
  }

}
