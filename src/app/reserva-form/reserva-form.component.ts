// reserva-form.component.ts
import { ApiService } from './../utils/api.service';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Reserva } from '../class/reserva';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-reserva-form',
  templateUrl: './reserva-form.component.html',
  styleUrls: ['./reserva-form.component.scss'],
  imports: [ReactiveFormsModule, HttpClientModule],
  standalone: true
})
export class ReservaFormComponent {
  @Output() reservaRealizada = new EventEmitter();
  @Input() idApartamento: number = 0; // Agrega este input

  reservaForm: FormGroup;
  modal: NgbModal = new NgbModal;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.reservaForm = this.fb.group({
      fechaEntrada: ['', Validators.required],
      fechaSalida: ['', Validators.required],
      contacto: ['', Validators.required],
    });
  }

  realizarReserva() {
    if (this.reservaForm.valid) {
      // Crear una instancia de Reserva con los datos del formulario
      const nuevaReserva: Reserva = {
        id: 1,
        apartmento_id: this.idApartamento,
        fecha_entrada: this.reservaForm.value.fechaEntrada,
        fecha_fin_contrato: this.reservaForm.value.fechaSalida,
        contacto_reserva: this.reservaForm.value.contacto,
      };

      // Llamar al método crearReserva del ApiService para enviar la reserva al servidor
      this.apiService.crearReserva(nuevaReserva).subscribe(
        (reservaCreada) => {
          // Lógica adicional si es necesario
          console.log('Reserva creada:', reservaCreada);

          // Emitir el evento de reserva realizada
          this.reservaRealizada.emit(reservaCreada);

          // Restablecer el formulario después de la reserva
          this.reservaForm.reset();
          this.modal.dismissAll();
        },
        (error) => {
          console.error('Error al crear la reserva:', error);
          // Manejar el error según sea necesario
        }
      );
    }
  }
}
