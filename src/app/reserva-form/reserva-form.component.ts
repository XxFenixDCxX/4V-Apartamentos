import { FormGroup, FormBuilder, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Reserva } from '../class/reserva';
import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomValidators {
  fechaEntradaPosterior(control: AbstractControl): { [key: string]: boolean } | null {
    const fechaEntrada = new Date(control.value);
    const hoy = new Date();

    return fechaEntrada > hoy ? null : { 'fechaEntradaPosterior': true };
  }

  fechaSalidaPosterior(control: AbstractControl): { [key: string]: boolean } | null {
    const fechaEntradaControl = control.get('fechaEntrada');
    const fechaSalida = new Date(control.value);

    if (fechaEntradaControl && fechaEntradaControl.value) {
      const fechaEntrada = new Date(fechaEntradaControl.value);

      return fechaSalida > fechaEntrada ? null : { 'fechaSalidaPosterior': true };
    }

    return null;
  }

}

@Component({
  selector: 'app-reserva-form',
  templateUrl: './reserva-form.component.html',
  styleUrls: ['./reserva-form.component.scss'],
  imports: [ReactiveFormsModule],
  standalone: true
})
export class ReservaFormComponent {
  @Output() reservaRealizada = new EventEmitter();
  @Input() idApartamento: number = 0;

  reservaForm: FormGroup;
  modal: NgbModal = new NgbModal;

  constructor(private fb: FormBuilder, private customValidators: CustomValidators) {
    this.reservaForm = this.fb.group({
      fechaEntrada: ['', [Validators.required, this.customValidators.fechaEntradaPosterior]],
      fechaSalida: ['', [Validators.required, this.customValidators.fechaSalidaPosterior]],
      contacto: ['', Validators.required],
    });
  }

  realizarReserva() {
    if (this.reservaForm.valid) {
      const nuevaReserva: Reserva = {
        id: 1,
        apartmento_id: this.idApartamento,
        fecha_entrada: this.reservaForm.value.fechaEntrada,
        fecha_fin_contrato: this.reservaForm.value.fechaSalida,
        contacto_reserva: this.reservaForm.value.contacto,
      };
      this.reservaForm.reset();
      this.modal.dismissAll();
    }
  }
}
