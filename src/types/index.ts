export type ItemStatus = 'disponible' | 'asignado' | 'mantenimiento' | 'baja';

export interface Item {
    id: string;
    tipo: 'Laptop' | 'Monitor' | 'Periférico' | 'Móvil' | 'Otro';
    marca: string;
    modelo: string;
    serial: string;
    estado: ItemStatus;
    asignado_a_id: string | null;
    imagen_url?: string;
}

export interface Empleado {
    id: string;
    nombre: string;
    cargo: string;
    departamento: string;
    email: string;
    telefono: string;
    documentos: string[]; // URLs or file names
    avatar_url?: string;
}

export interface Historial {
    id: string;
    item_id: string;
    empleado_id: string;
    fecha_inicio: string;
    fecha_fin: string | null;
    documento_url: string;
}

export interface DashboardStats {
    total_items: number;
    asignados: number;
    disponibles: number;
    mantenimiento: number;
}
