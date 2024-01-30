import { Foto } from "./foto";
import { Reserva } from "./reserva";

export class Apartamento {
  id: number;
  titulo: string;
  description: string;
  direccion: string;
  precio: number;
  fotos: Foto[];
  ultima_reserva: Reserva;

  constructor(id: number, titulo: string, description: string, direccion: string, precio: number, fotos: Foto[], ultima_reserva: Reserva) {
    this.id = id;
    this.titulo = titulo;
    this.description = description;
    this.direccion = direccion;
    this.precio = precio;
    this.fotos = fotos;
    this.ultima_reserva = ultima_reserva;
  }
}
