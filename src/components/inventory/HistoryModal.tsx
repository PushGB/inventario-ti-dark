import React from 'react';
import { X, FileText, Calendar, User, ArrowRight } from 'lucide-react';
import { Historial, Empleado } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface HistoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    historial: Historial[];
    empleados: Empleado[];
    itemName: string;
}

export function HistoryModal({ isOpen, onClose, historial, empleados, itemName }: HistoryModalProps) {
    if (!isOpen) return null;

    // Sort history by date desc
    const sortedHistory = [...historial].sort((a, b) =>
        new Date(b.fecha_inicio).getTime() - new Date(a.fecha_inicio).getTime()
    );

    const getEmpleadoName = (id: string) =>
        empleados.find(e => e.id === id)?.nombre || 'Desconocido';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-2xl bg-[#1E1E1E] border border-[#333333] rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-[#333333]">
                    <div>
                        <h2 className="text-xl font-semibold text-white">Historial de Asignaciones</h2>
                        <p className="text-sm text-[#9E9E9E] mt-1">Item: {itemName}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* Content */}
                <div className="p-6 max-h-[60vh] overflow-y-auto">
                    {sortedHistory.length === 0 ? (
                        <div className="text-center py-10 text-[#9E9E9E]">
                            <p>No hay historial disponible para este ítem.</p>
                        </div>
                    ) : (
                        <div className="relative pl-8 border-l border-[#333333] space-y-8">
                            {sortedHistory.map((record) => (
                                <div key={record.id} className="relative">
                                    {/* Timeline Dot */}
                                    <div className="absolute -left-[39px] top-1 h-5 w-5 rounded-full border-4 border-[#121212] bg-[#FFFFFF]" />

                                    <Card className="p-4 bg-[#252525] border-[#333333]">
                                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">

                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2">
                                                    <User className="w-4 h-4 text-[#9E9E9E]" />
                                                    <span className="font-medium text-white">
                                                        {getEmpleadoName(record.empleado_id)}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-2 text-sm text-[#9E9E9E]">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>
                                                        {record.fecha_inicio}
                                                        <span className="mx-2 text-[#666666]">→</span>
                                                        {record.fecha_fin || 'Presente'}
                                                    </span>
                                                </div>
                                            </div>

                                            {record.documento_url && (
                                                <a
                                                    href={record.documento_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="flex items-center gap-2 text-xs font-medium text-white hover:text-[#9E9E9E] transition-colors border border-[#444444] rounded px-3 py-2 hover:bg-[#333333]"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        alert("Simulación: Abriendo PDF 'Acta de Entrega'...");
                                                    }}
                                                >
                                                    <FileText className="w-4 h-4" />
                                                    Acta de Entrega
                                                </a>
                                            )}
                                        </div>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
