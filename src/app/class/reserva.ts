export class Reserva {
  id: number;
  apartmento_id: number;
  fecha_entrada: string;
  fecha_fin_contrato: string;
  contacto_reserva: string;

  constructor(id: number, apartmento_id: number, fecha_entrada: string, fecha_fin_contrato: string, contacto_reserva: string) {
    this.id = id;
    this.apartmento_id = apartmento_id;
    this.fecha_entrada = fecha_entrada;
    this.fecha_fin_contrato = fecha_fin_contrato;
    this.contacto_reserva = contacto_reserva;
  }
}
