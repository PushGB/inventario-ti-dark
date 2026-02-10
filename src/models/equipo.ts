export interface Equipo {
  id: number;
  serie: string;
  nombre: string;
  observacion?: string;
  id_estado: number;
  id_modelo: number;
  id_tipoequipo: number;
  id_contrato: number;
  activo: boolean;
}

