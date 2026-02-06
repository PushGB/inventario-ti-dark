import React, { useState } from 'react';
import { Search, History, MoreVertical } from 'lucide-react';
import { Item, Empleado } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface InventoryTableProps {
    items: Item[];
    empleados: Empleado[];
    onViewHistory: (item: Item) => void;
}

export function InventoryTable({ items, empleados, onViewHistory }: InventoryTableProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredItems = items.filter(item =>
        item.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.serial.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tipo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getEmpleadoName = (id: string | null) => {
        if (!id) return '-';
        return empleados.find(e => e.id === id)?.nombre || 'Desconocido';
    };

    return (
        <div className="space-y-4">
            {/* Search Bar */}
            <div className="flex items-center gap-2 bg-[#1E1E1E] p-2 rounded-lg border border-[#333333] w-full max-w-md">
                <Search className="w-5 h-5 text-[#9E9E9E]" />
                <input
                    type="text"
                    placeholder="Buscar por serie, modelo, tipo..."
                    className="bg-transparent border-none focus:outline-none text-white w-full placeholder-[#666666]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <Card className="p-0 overflow-hidden bg-[#1E1E1E]">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#252525] text-[#9E9E9E] font-medium border-b border-[#333333]">
                            <tr>
                                <th className="px-6 py-4">Tipo</th>
                                <th className="px-6 py-4">Marca/Modelo</th>
                                <th className="px-6 py-4">Serial</th>
                                <th className="px-6 py-4">Asignado A</th>
                                <th className="px-6 py-4">Estado</th>
                                <th className="px-6 py-4 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#333333]">
                            {filteredItems.map((item) => (
                                <tr key={item.id} className="hover:bg-[#252525] transition-colors">
                                    <td className="px-6 py-4 font-medium text-white">{item.tipo}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-white">{item.modelo}</span>
                                            <span className="text-xs text-[#9E9E9E]">{item.marca}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-xs text-[#9E9E9E]">{item.serial}</td>
                                    <td className="px-6 py-4 text-[#E0E0E0]">
                                        {getEmpleadoName(item.asignado_a_id)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge status={item.estado} />
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={() => onViewHistory(item)}
                                            className="gap-2"
                                        >
                                            <History className="w-4 h-4" />
                                            Historial
                                        </Button>
                                    </td>
                                </tr>
                            ))}

                            {filteredItems.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-[#9E9E9E]">
                                        No se encontraron resultados
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
