import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reserva } from './../class/reserva';
import { Apartamento } from './../class/apartamento';
import { Foto } from '../class/foto';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://65b797f446324d531d550097.mockapi.io';

  constructor(private http: HttpClient) { }

  obtenerReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.apiUrl}/reserva`).pipe(
      map((reservasAPI: any[]) => {
        return reservasAPI.map(reserva => new Reserva(
          reserva.id,
          reserva.apartmento_id,
          reserva.fecha_entrada,
          reserva.fecha_fin_contrato,
          reserva.contacto_reserva
        ));
      })
    );
  }

  obtenerApartamentos(): Observable<Apartamento[]> {
    return this.http.get<Apartamento[]>(`${this.apiUrl}/apartamentos`).pipe(
      map((apartamentosAPI: any[]) => {
        return apartamentosAPI.map(apartamento => {
          const ultimaReserva = apartamento.ultima_reserva || {};
          const fotos: Foto[] = (apartamento.fotos || []).map((foto: any) => new Foto(foto.id, foto.url));
          return new Apartamento(
            apartamento.id,
            apartamento.titulo,
            apartamento.description,
            apartamento.direccion,
            apartamento.precio,
            fotos,
            new Reserva(
              ultimaReserva.id || null,
              apartamento.id,
              ultimaReserva.fecha_entrada || null,
              ultimaReserva.fecha_fin_contrato || null,
              ultimaReserva.contacto_reserva || null
            )
          );
        });
      })
    );
  }

}
