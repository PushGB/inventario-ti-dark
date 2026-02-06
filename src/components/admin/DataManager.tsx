import React, { useState } from 'react';
import { Plus, Save, FileText, Upload, User, Monitor, Link as LinkIcon } from 'lucide-react';
import { Item, ItemStatus, Empleado } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface DataManagerProps {
    items: Item[];
    employees: Empleado[];
    onAddItem: (item: Item) => void;
    onAddEmployee: (employee: Empleado) => void;
    onAssignItem: (itemId: string, employeeId: string) => void;
}

export function DataManager({ items, employees, onAddItem, onAddEmployee, onAssignItem }: DataManagerProps) {
    const [activeTab, setActiveTab] = useState<'ativos' | 'empleados' | 'asignaciones'>('ativos');

    // Item Form State
    const [itemForm, setItemForm] = useState<Partial<Item>>({
        tipo: 'Laptop',
        estado: 'disponible',
        marca: '',
        modelo: '',
        serial: ''
    });

    // Employee Form State
    const [empForm, setEmpForm] = useState<Partial<Empleado>>({
        nombre: '',
        departamento: '',
        cargo: '',
        email: '',
        telefono: '',
        documentos: []
    });

    // Assignment Form State
    const [assignForm, setAssignForm] = useState({
        itemId: '',
        employeeId: ''
    });

    const handleItemSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newItem: Item = {
            id: `IT-${Date.now()}`,
            tipo: itemForm.tipo as any,
            marca: itemForm.marca || '',
            modelo: itemForm.modelo || '',
            serial: itemForm.serial || '',
            estado: itemForm.estado as ItemStatus,
            asignado_a_id: null,
            ...itemForm
        } as Item;

        onAddItem(newItem);
        setItemForm({
            tipo: 'Laptop',
            estado: 'disponible',
            marca: '',
            modelo: '',
            serial: ''
        });
        alert('Activo agregado correctamente');
    };

    const handleEmployeeSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newEmp: Empleado = {
            id: `E-${Date.now()}`,
            nombre: empForm.nombre || '',
            departamento: empForm.departamento || '',
            cargo: empForm.cargo || '',
            email: empForm.email || '',
            telefono: empForm.telefono || '',
            documentos: empForm.documentos || []
        };

        onAddEmployee(newEmp);
        setEmpForm({
            nombre: '',
            departamento: '',
            cargo: '',
            email: '',
            telefono: '',
            documentos: []
        });
        alert('Empleado registrado correctamente');
    };

    const handleAssignmentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!assignForm.itemId || !assignForm.employeeId) {
            alert('Por favor seleccione un activo y un empleado');
            return;
        }
        onAssignItem(assignForm.itemId, assignForm.employeeId);
        setAssignForm({ itemId: '', employeeId: '' });
        alert('Asignación realizada correctamente');
    };

    const handleFileUpload = () => {
        const fileName = `documento_${Date.now()}.pdf`;
        setEmpForm(prev => ({
            ...prev,
            documentos: [...(prev.documentos || []), fileName]
        }));
        alert(`Simulación: Archivo ${fileName} cargado exitosamente`);
    };

    const availableItems = items.filter(i => i.estado === 'disponible');

    return (
        <div className="space-y-6 animate-in fade-in">
            {/* Tabs */}
            <div className="flex space-x-4 border-b border-[#333333] pb-1 overflow-x-auto">
                <button
                    onClick={() => setActiveTab('ativos')}
                    className={`pb-3 px-4 flex items-center gap-2 font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === 'ativos'
                            ? 'text-white border-white'
                            : 'text-[#9E9E9E] border-transparent hover:text-white'
                        }`}
                >
                    <Monitor className="w-4 h-4" />
                    Activos
                </button>
                <button
                    onClick={() => setActiveTab('empleados')}
                    className={`pb-3 px-4 flex items-center gap-2 font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === 'empleados'
                            ? 'text-white border-white'
                            : 'text-[#9E9E9E] border-transparent hover:text-white'
                        }`}
                >
                    <User className="w-4 h-4" />
                    Empleados
                </button>
                <button
                    onClick={() => setActiveTab('asignaciones')}
                    className={`pb-3 px-4 flex items-center gap-2 font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === 'asignaciones'
                            ? 'text-white border-white'
                            : 'text-[#9E9E9E] border-transparent hover:text-white'
                        }`}
                >
                    <LinkIcon className="w-4 h-4" />
                    Asignaciones
                </button>
            </div>

            {activeTab === 'ativos' && (
                <Card>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-white">Agregar Nuevo Activo</h2>
                    </div>

                    <form onSubmit={handleItemSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#E0E0E0]">Tipo</label>
                            <select
                                className="w-full px-4 py-2 bg-[#252525] border border-[#333333] rounded-lg text-white focus:outline-none focus:border-white/50"
                                value={itemForm.tipo}
                                onChange={(e) => setItemForm({ ...itemForm, tipo: e.target.value as any })}
                            >
                                <option value="Laptop">Laptop</option>
                                <option value="Monitor">Monitor</option>
                                <option value="Periférico">Periférico</option>
                                <option value="Móvil">Móvil</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#E0E0E0]">Marca</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 bg-[#252525] border border-[#333333] rounded-lg text-white focus:outline-none focus:border-white/50"
                                value={itemForm.marca}
                                onChange={(e) => setItemForm({ ...itemForm, marca: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#E0E0E0]">Modelo</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 bg-[#252525] border border-[#333333] rounded-lg text-white focus:outline-none focus:border-white/50"
                                value={itemForm.modelo}
                                onChange={(e) => setItemForm({ ...itemForm, modelo: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#E0E0E0]">Serial</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 bg-[#252525] border border-[#333333] rounded-lg text-white focus:outline-none focus:border-white/50"
                                value={itemForm.serial}
                                onChange={(e) => setItemForm({ ...itemForm, serial: e.target.value })}
                                required
                            />
                        </div>

                        <div className="md:col-span-2 pt-4">
                            <Button type="submit" className="w-full md:w-auto">
                                <Plus className="w-4 h-4 mr-2" />
                                Guardar Activo
                            </Button>
                        </div>
                    </form>
                </Card>
            )}

            {activeTab === 'empleados' && (
                <Card>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-white">Registrar Empleado</h2>
                    </div>

                    <form onSubmit={handleEmployeeSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#E0E0E0]">Nombre Completo</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 bg-[#252525] border border-[#333333] rounded-lg text-white focus:outline-none focus:border-white/50"
                                value={empForm.nombre}
                                onChange={(e) => setEmpForm({ ...empForm, nombre: e.target.value })}
                                required
                                placeholder="Juan Pérez"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#E0E0E0]">Correo Electrónico</label>
                            <input
                                type="email"
                                className="w-full px-4 py-2 bg-[#252525] border border-[#333333] rounded-lg text-white focus:outline-none focus:border-white/50"
                                value={empForm.email}
                                onChange={(e) => setEmpForm({ ...empForm, email: e.target.value })}
                                required
                                placeholder="juan.perez@empresa.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#E0E0E0]">Teléfono</label>
                            <input
                                type="tel"
                                className="w-full px-4 py-2 bg-[#252525] border border-[#333333] rounded-lg text-white focus:outline-none focus:border-white/50"
                                value={empForm.telefono}
                                onChange={(e) => setEmpForm({ ...empForm, telefono: e.target.value })}
                                required
                                placeholder="+56 9 ..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#E0E0E0]">Departamento</label>
                            <select
                                className="w-full px-4 py-2 bg-[#252525] border border-[#333333] rounded-lg text-white focus:outline-none focus:border-white/50"
                                value={empForm.departamento}
                                onChange={(e) => setEmpForm({ ...empForm, departamento: e.target.value })}
                                required
                            >
                                <option value="">Seleccionar...</option>
                                <option value="Ingeniería">Ingeniería</option>
                                <option value="Producto">Producto</option>
                                <option value="Diseño">Diseño</option>
                                <option value="Ventas">Ventas</option>
                                <option value="RRHH">RRHH</option>
                                <option value="Finanzas">Finanzas</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#E0E0E0]">Cargo</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 bg-[#252525] border border-[#333333] rounded-lg text-white focus:outline-none focus:border-white/50"
                                value={empForm.cargo}
                                onChange={(e) => setEmpForm({ ...empForm, cargo: e.target.value })}
                                required
                                placeholder="Ej. Analista Senior"
                            />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-[#E0E0E0]">Documentos</label>
                            <div className="flex items-center gap-4">
                                <Button type="button" variant="secondary" onClick={handleFileUpload}>
                                    <Upload className="w-4 h-4 mr-2" />
                                    Cargar PDF (Simulado)
                                </Button>
                                {empForm.documentos && empForm.documentos.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {empForm.documentos.map((doc, idx) => (
                                            <div key={idx} className="flex items-center bg-[#252525] px-3 py-1 rounded-full text-xs text-[#9E9E9E] border border-[#333333]">
                                                <FileText className="w-3 h-3 mr-1" />
                                                {doc}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="md:col-span-2 pt-4 border-t border-[#333333] mt-2">
                            <Button type="submit" className="w-full md:w-auto">
                                <Save className="w-4 h-4 mr-2" />
                                Registrar Empleado
                            </Button>
                        </div>
                    </form>
                </Card>
            )}

            {activeTab === 'asignaciones' && (
                <Card>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-white">Asignar Activo a Empleado</h2>
                    </div>

                    <form onSubmit={handleAssignmentSubmit} className="space-y-6 max-w-2xl">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#E0E0E0]">Seleccionar Activo Disponible</label>
                            <select
                                className="w-full px-4 py-2 bg-[#252525] border border-[#333333] rounded-lg text-white focus:outline-none focus:border-white/50"
                                value={assignForm.itemId}
                                onChange={(e) => setAssignForm({ ...assignForm, itemId: e.target.value })}
                                required
                            >
                                <option value="">Seleccionar activo...</option>
                                {availableItems.map(item => (
                                    <option key={item.id} value={item.id}>
                                        {item.tipo} - {item.marca} {item.modelo} (Serial: {item.serial})
                                    </option>
                                ))}
                                {availableItems.length === 0 && <option disabled>No hay activos disponibles</option>}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#E0E0E0]">Seleccionar Empleado</label>
                            <select
                                className="w-full px-4 py-2 bg-[#252525] border border-[#333333] rounded-lg text-white focus:outline-none focus:border-white/50"
                                value={assignForm.employeeId}
                                onChange={(e) => setAssignForm({ ...assignForm, employeeId: e.target.value })}
                                required
                            >
                                <option value="">Seleccionar empleado...</option>
                                {employees.map(emp => (
                                    <option key={emp.id} value={emp.id}>
                                        {emp.nombre} - {emp.departamento}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="pt-4">
                            <Button type="submit" disabled={availableItems.length === 0}>
                                <LinkIcon className="w-4 h-4 mr-2" />
                                Confirmar Asignación
                            </Button>
                        </div>
                    </form>
                </Card>
            )}
        </div>
    );
}
