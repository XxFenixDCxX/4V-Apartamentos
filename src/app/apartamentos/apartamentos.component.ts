import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../utils/api.service';
import { Apartamento } from '../class/apartamento';
import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Reserva } from '../class/reserva';

@Component({
  selector: 'app-apartamentos',
  standalone: true,
  imports: [CommonModule, NgbDatepickerModule, NgbAlertModule, FormsModule, JsonPipe, NgbCarouselModule],
  templateUrl: './apartamentos.component.html',
  styleUrls: ['./apartamentos.component.scss']
})
export class ApartamentosComponent implements OnInit {

  filtroLibres = false;
  apartamentos: Apartamento[] = [];
  filtroFecha: string | null = null;
  model: NgbDateStruct = this.obtenerFechaHoy();

  obtenerFechaHoy(): NgbDateStruct {
    const hoy = new Date();
    return { year: hoy.getFullYear(), month: hoy.getMonth() + 1, day: hoy.getDate() };
  }

  isDisponibleHoy(ultimaReserva: Reserva): boolean {
    if (!ultimaReserva || !ultimaReserva.fecha_entrada || !ultimaReserva.fecha_fin_contrato) {
      return true; // Si no hay reserva o fechas, está disponible
    }

    const fechaEntrada = this.parsearFecha(ultimaReserva.fecha_entrada);
    const fechaSalida = this.parsearFecha(ultimaReserva.fecha_fin_contrato);
    const hoy = new Date();

    const fechaFiltro = this.filtroFecha ? this.parsearFecha(this.filtroFecha) : null;

    return (hoy < fechaEntrada || hoy > fechaSalida) && (fechaFiltro ? this.sonFechasIguales(hoy, fechaFiltro) : true);
  }

  sonFechasIguales(fecha1: Date, fecha2: Date): boolean {
    return fecha1.toDateString() === fecha2.toDateString();
  }



  filtrarApartamentos() {
    return this.apartamentos.filter(apartamento => {
      if (this.filtroLibres) {
        // Lógica para filtrar los apartamentos libres
        return !apartamento.ultima_reserva || this.isDisponibleHoy(apartamento.ultima_reserva);
      } else if (this.filtroFecha) {
        // Lógica para filtrar por fecha seleccionada
        const fechaSeleccionada = this.parsearFecha(this.filtroFecha);

        if (apartamento.ultima_reserva && apartamento.ultima_reserva.fecha_fin_contrato) {
          const fechaFinContrato = this.parsearFecha(apartamento.ultima_reserva.fecha_fin_contrato);
          return fechaFinContrato < fechaSeleccionada; // Corregir la comparación
        }

        return true; // Cambiar a true para mostrar los que no tienen reserva
      } else {
        // Mostrar todos los apartamentos
        return true;
      }
    });
  }

  parsearFecha(fechaString: string): Date {
    // Parsear el formato "2024-1-6" a un objeto Date
    const partesFecha = fechaString.split('-').map(part => parseInt(part, 10));
    return new Date(partesFecha[0], partesFecha[1] - 1, partesFecha[2]);
  }

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.obtenerApartamentos().subscribe(
      (apartamentos: Apartamento[]) => {
        this.apartamentos = apartamentos;
      },
      error => {
        console.error('Error al obtener los apartamentos', error);
      }
    );
  }

}
