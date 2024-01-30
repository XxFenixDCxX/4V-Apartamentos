import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reserva } from './../class/reserva';
import { Apartamento } from './../class/apartamento';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://65b797f446324d531d550097.mockapi.io';

  constructor(private http: HttpClient) { }

  obtenerReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.apiUrl}/reserva`).pipe(
      map((reservasAPI: any[]) => {
        return reservasAPI.map(reserva => new Reserva(
          reserva.id,
          reserva.apatamento_id,
          reserva.fecha_entrada,
          reserva.fecha_fin_contrato,
          reserva.contacto_reserva
        ));
      })
    );
  }

  obtenerApartamentos(): Observable<Apartamento[]> {
    return this.http.get<Apartamento[]>(`${this.apiUrl}/apartamento`).pipe(
      map((apartamentosAPI: any[]) => {
        return apartamentosAPI.map(apartamento => new Apartamento(
          apartamento.id,
          apartamento.titulo,
          apartamento.description,
          apartamento.precio,
          apartamento.fotos,
          new Reserva(
            apartamento.ultima_reserva.id,
            apartamento.ultima_reserva.apatamento_id,
            apartamento.ultima_reserva.fecha_entrada,
            apartamento.ultima_reserva.fecha_fin_contrato,
            apartamento.ultima_reserva.contacto_reserva
          )
        ));
      })
    );
  }
}
