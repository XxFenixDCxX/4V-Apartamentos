import { ApiService } from './../utils/api.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Apartamento } from '../class/apartamento';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss'],
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true
})
export class ContactoComponent implements OnInit {
  apartamentos: Apartamento[] = [];
  contactoForm: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.contactoForm = this.fb.group({
      emailRespuesta: ['', [Validators.required, Validators.email]],
      apartamento: ['', Validators.required],
      pregunta: ['', Validators.required],
    });
  }

  ngOnInit(): void {

    this.api.obtenerApartamentos().subscribe(
      (apartamentos: Apartamento[]) => {
        this.apartamentos = apartamentos;
      },
      error => {
        console.error('Error al obtener los apartamentos', error);
      }
    );
  }

  generarLinkMailto() {
    if (this.contactoForm.valid) {
      const emailRespuesta = this.contactoForm.get('emailRespuesta')?.value;
      const apartamento = this.contactoForm.get('apartamento')?.value;
      const pregunta = this.contactoForm.get('pregunta')?.value;

      if (emailRespuesta && apartamento && pregunta) {
        const mailtoLink = `mailto:${emailRespuesta}?subject=Consulta sobre ${apartamento}&body=${pregunta}`;
        window.location.href = mailtoLink;
      }
    }
  }
}
