import { Item, Empleado, Historial } from '../types';

export const empleados: Empleado[] = [
    {
        id: 'E001',
        nombre: 'Ana García',
        cargo: 'Senior Developer',
        departamento: 'Ingeniería',
        email: 'ana.garcia@company.com',
        telefono: '+56 9 1234 5678',
        documentos: ['contrato.pdf', 'entrega_equipo.pdf']
    },
    {
        id: 'E002',
        nombre: 'Carlos Ruiz',
        cargo: 'Product Owner',
        departamento: 'Producto',
        email: 'carlos.ruiz@company.com',
        telefono: '+56 9 8765 4321',
        documentos: []
    },
    {
        id: 'E003',
        nombre: 'Elena Torres',
        cargo: 'UX Designer',
        departamento: 'Diseño',
        email: 'elena.torres@company.com',
        telefono: '+56 9 2468 1357',
        documentos: []
    },
    {
        id: 'E004',
        nombre: 'Miguel Angel',
        cargo: 'DevOps Engineer',
        departamento: 'Infraestructura',
        email: 'miguel.angel@company.com',
        telefono: '+56 9 1357 2468',
        documentos: []
    },
    {
        id: 'E005',
        nombre: 'Lucía Méndez',
        cargo: 'QA Lead',
        departamento: 'Calidad',
        email: 'lucia.mendez@company.com',
        telefono: '+56 9 9876 5432',
        documentos: []
    },
];

export const items: Item[] = [
    {
        id: 'IT-001',
        tipo: 'Laptop',
        marca: 'Apple',
        modelo: 'MacBook Pro M2 14"',
        serial: 'FVFXL9J0P',
        estado: 'asignado',
        asignado_a_id: 'E001'
    },
    {
        id: 'IT-002',
        tipo: 'Laptop',
        marca: 'Dell',
        modelo: 'XPS 15',
        serial: 'DL-99382-X',
        estado: 'disponible',
        asignado_a_id: null
    },
    {
        id: 'IT-003',
        tipo: 'Monitor',
        marca: 'LG',
        modelo: 'UltraFine 4K',
        serial: 'LG-4K-009',
        estado: 'asignado',
        asignado_a_id: 'E001'
    },
    {
        id: 'IT-004',
        tipo: 'Móvil',
        marca: 'Samsung',
        modelo: 'Galaxy S23',
        serial: 'SM-S23-001',
        estado: 'mantenimiento',
        asignado_a_id: null
    },
    {
        id: 'IT-005',
        tipo: 'Laptop',
        marca: 'Lenovo',
        modelo: 'ThinkPad X1 Carbon',
        serial: 'PF-2L9K40',
        estado: 'asignado',
        asignado_a_id: 'E002'
    },
    {
        id: 'IT-006',
        tipo: 'Periférico',
        marca: 'Logitech',
        modelo: 'MX Master 3S',
        serial: 'LOG-MS-003',
        estado: 'asignado',
        asignado_a_id: 'E001'
    },
    {
        id: 'IT-007',
        tipo: 'Laptop',
        marca: 'Apple',
        modelo: 'MacBook Air M1',
        serial: 'C02FK0P',
        estado: 'baja',
        asignado_a_id: null
    },
    {
        id: 'IT-008',
        tipo: 'Monitor',
        marca: 'Dell',
        modelo: 'UltraSharp 27"',
        serial: 'DL-US27-04',
        estado: 'disponible',
        asignado_a_id: null
    }
];

export const historial: Historial[] = [
    {
        id: 'H-001',
        item_id: 'IT-001',
        empleado_id: 'E001',
        fecha_inicio: '2023-01-15',
        fecha_fin: null,
        documento_url: '#'
    },
    {
        id: 'H-002',
        item_id: 'IT-002',
        empleado_id: 'E003',
        fecha_inicio: '2023-02-10',
        fecha_fin: '2023-08-20',
        documento_url: '#'
    },
    {
        id: 'H-003',
        item_id: 'IT-005',
        empleado_id: 'E002',
        fecha_inicio: '2023-03-01',
        fecha_fin: null,
        documento_url: '#'
    },
    {
        id: 'H-004',
        item_id: 'IT-002',
        empleado_id: 'E004',
        fecha_inicio: '2022-06-01',
        fecha_fin: '2023-01-30',
        documento_url: '#'
    }
];
