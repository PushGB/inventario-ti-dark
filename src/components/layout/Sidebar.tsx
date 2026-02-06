import React from 'react';
import { LayoutDashboard, Package, Settings, LogOut, Box } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarProps {
    currentView: 'dashboard' | 'inventory' | 'management';
    onViewChange: (view: 'dashboard' | 'inventory' | 'management') => void;
    onLogout: () => void;
}

export function Sidebar({ currentView, onViewChange, onLogout }: SidebarProps) {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'inventory', label: 'Inventario', icon: Package },
        { id: 'management', label: 'Gestión', icon: Settings },
    ] as const;

    return (
        <aside className="w-64 bg-[#1E1E1E] border-r border-[#333333] flex flex-col h-screen fixed left-0 top-0 z-10 hidden md:flex">
            {/* Brand */}
            <div className="p-6 flex items-center gap-3 border-b border-[#333333]">
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                    <Box className="text-black w-5 h-5 fill-current" />
                </div>
                <span className="font-bold text-lg text-white tracking-tight">Inventario IT</span>
            </div>

            {/* Nav */}
            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentView === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onViewChange(item.id)}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-white text-black"
                                    : "text-[#9E9E9E] hover:bg-[#252525] hover:text-white"
                            )}
                        >
                            <Icon className="w-5 h-5" />
                            {item.label}
                        </button>
                    );
                })}
            </nav>

            {/* Footer / User */}
            <div className="p-4 border-t border-[#333333] space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-[#9E9E9E] hover:text-white hover:bg-[#252525] rounded-lg text-sm transition-colors">
                    <Settings className="w-5 h-5" />
                    Configuración
                </button>
                <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg text-sm transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    Cerrar Sesión
                </button>
            </div>
        </aside>
    );
}
