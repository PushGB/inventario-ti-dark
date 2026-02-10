import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { InventoryTable } from './components/inventory/InventoryTable';
import { StatCard } from './components/dashboard/StatCard';
import { HistoryModal } from './components/inventory/HistoryModal';
import { LoginPage } from './components/auth/LoginPage';
import { DataManager } from './components/admin/DataManager';
import { SupportChat } from './components/support/SupportChat';
import { ExampleTable } from './components/example/ExampleTable';
import { items as initialItems, empleados as initialEmpleados, historial as initialHistorial } from './data/mock';
import { Item, Empleado } from './types';
import { Monitor, Laptop, Smartphone, HardDrive, Menu } from 'lucide-react';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentView, setCurrentView] = useState<'dashboard' | 'inventory' | 'management' | 'example'>('dashboard');

    // App State
    const [items, setItems] = useState<Item[]>(initialItems);
    const [empleados] = useState<Empleado[]>(initialEmpleados);
    const [historial, setHistorial] = useState(initialHistorial);

    const [historyItem, setHistoryItem] = useState<Item | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Stats Calculation
    const stats = {
        total: items.length,
        assigned: items.filter(i => i.estado === 'asignado').length,
        available: items.filter(i => i.estado === 'disponible').length,
        maintenance: items.filter(i => i.estado === 'mantenimiento').length,
    };

    const getHistoryForItem = (itemId: string) =>
        historial.filter(h => h.item_id === itemId);

    const handleLogout = () => {
        setIsAuthenticated(false);
        setCurrentView('dashboard');
    };

    const handleAddItem = (newItem: Item) => {
        setItems(prev => [newItem, ...prev]);
    };

    const handleAddEmployee = (newEmployee: Empleado) => {
        // In a real app we might update the empleados state list
        console.log("New employee added:", newEmployee);
    };

    const handleAssignItem = (itemId: string, employeeId: string) => {
        // 1. Update Item Status
        setItems(prevItems => prevItems.map(item => {
            if (item.id === itemId) {
                return { ...item, estado: 'asignado', asignado_a_id: employeeId };
            }
            return item;
        }));

        // 2. Create History Record
        const newHistoryRecord: any = {
            id: `H-${Date.now()}`,
            item_id: itemId,
            empleado_id: employeeId,
            fecha_inicio: new Date().toISOString().split('T')[0],
            fecha_fin: null,
            documento_url: '#'
        };

        setHistorial(prev => [newHistoryRecord, ...prev]);
    };

    if (!isAuthenticated) {
        return <LoginPage onLogin={() => setIsAuthenticated(true)} />;
    }

    return (
        <div className="min-h-screen bg-[#121212] text-primary flex">
            {/* Mobile Menu Button */}
            <button
                className="fixed top-4 right-4 z-50 md:hidden p-2 bg-[#252525] rounded-lg border border-[#333333]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                <Menu className="w-6 h-6 text-white" />
            </button>

            {/* Sidebar */}
            <div className={`${mobileMenuOpen ? 'flex' : 'hidden'} md:flex`}>
                <Sidebar
                    currentView={currentView}
                    onViewChange={(view) => {
                        setCurrentView(view);
                        setMobileMenuOpen(false);
                    }}
                    onLogout={handleLogout}
                />
            </div>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-6 md:p-12 overflow-y-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-white tracking-tight">
                        {currentView === 'dashboard' ? 'Resumen General' :
                            currentView === 'inventory' ? 'Inventario de Activos' :
                                currentView === 'management' ? 'Gestión de Datos' :
                                    'Ejemplo'}
                    </h1>
                    <p className="text-[#9E9E9E] mt-2">
                        {currentView === 'dashboard' ? 'Vista general del estado de los equipos TI.' :
                            currentView === 'inventory' ? 'Gestión y control de asignaciones.' :
                                currentView === 'management' ? 'Administración de activos y empleados.' :
                                    'Página de ejemplo solicitada.'}
                    </p>
                </header>

                {currentView === 'dashboard' && (
                    <div className="space-y-8 animate-in fade-in duration-500">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard
                                title="Total Activos"
                                value={stats.total}
                                icon={Laptop}
                                description="Inventario completo"
                            />
                            <StatCard
                                title="Asignados"
                                value={stats.assigned}
                                icon={Monitor}
                                description="En uso por empleados"
                            />
                            <StatCard
                                title="Disponibles"
                                value={stats.available}
                                icon={HardDrive}
                                description="En stock listos"
                            />
                            <StatCard
                                title="Mantenimiento"
                                value={stats.maintenance}
                                icon={Smartphone}
                                description="En reparación"
                            />
                        </div>

                        {/* Quick Actions / Recent Activity (Placeholder) */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-[#1E1E1E] border border-[#333333] rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-white mb-4">Actividad Reciente</h3>
                                <div className="space-y-4">
                                    {historial.slice(0, 3).map((h, i) => {
                                        const item = items.find(it => it.id === h.item_id);
                                        const emp = empleados.find(e => e.id === h.empleado_id);
                                        return (
                                            <div key={i} className="flex items-center justify-between py-2 border-b border-[#333333] last:border-0">
                                                <div>
                                                    <p className="text-sm font-medium text-[#E0E0E0]">{emp?.nombre || 'Usuario'}</p>
                                                    <p className="text-xs text-[#9E9E9E]">Recibió {item?.marca} {item?.modelo}</p>
                                                </div>
                                                <span className="text-xs text-[#9E9E9E]">{h.fecha_inicio}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {currentView === 'inventory' && (
                    <div className="animate-in fade-in duration-500">
                        <InventoryTable
                            items={items}
                            empleados={empleados}
                            onViewHistory={setHistoryItem}
                        />
                    </div>
                )}

                {currentView === 'management' && (
                    <DataManager
                        items={items}
                        employees={empleados}
                        onAddItem={handleAddItem}
                        onAddEmployee={handleAddEmployee}
                        onAssignItem={handleAssignItem}
                    />
                )}

                {currentView === 'example' && (
                    <div className="animate-in fade-in duration-500">
                        <ExampleTable />
                    </div>
                )}
            </main>

            {/* Global Modals & Widgets */}
            <HistoryModal
                isOpen={!!historyItem}
                onClose={() => setHistoryItem(null)}
                historial={historyItem ? getHistoryForItem(historyItem.id) : []}
                empleados={empleados}
                itemName={historyItem ? `${historyItem.marca} ${historyItem.modelo}` : ''}
            />

            <SupportChat />
        </div>
    );
}

export default App;
