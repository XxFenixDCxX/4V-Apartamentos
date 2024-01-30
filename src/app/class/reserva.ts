export class Reserva {
  id: number;
  apartment_id: number;
  fecha_entrada: string;
  fecha_fin_contrato: string;
  contacto_reserva: string;

  constructor(id: number, apartment_id: number, fecha_entrada: string, fecha_fin_contrato: string, contacto_reserva: string) {
    this.id = id;
    this.apartment_id = apartment_id;
    this.fecha_entrada = fecha_entrada;
    this.fecha_fin_contrato = fecha_fin_contrato;
    this.contacto_reserva = contacto_reserva;
  }
}
