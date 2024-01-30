import { Reserva } from "./reserva";

export class Apartamento {
  id: number;
  titulo: string;
  description: string;
  precio: number;
  fotos: { id: number; url: string }[];
  ultima_reserva: Reserva;

  constructor(id: number, titulo: string, description: string, precio: number, fotos: { id: number; url: string }[], ultima_reserva: Reserva) {
    this.id = id;
    this.titulo = titulo;
    this.description = description;
    this.precio = precio;
    this.fotos = fotos;
    this.ultima_reserva = ultima_reserva;
  }
}
