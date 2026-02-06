import React from 'react';
import { cn } from '../../lib/utils';
import { ItemStatus } from '../../types';

interface BadgeProps {
    status: ItemStatus | 'default';
    className?: string;
    children?: React.ReactNode;
}

const statusStyles: Record<ItemStatus | 'default', string> = {
    disponible: 'bg-green-900/30 text-green-400 border-green-900',
    asignado: 'bg-blue-900/30 text-blue-400 border-blue-900',
    mantenimiento: 'bg-orange-900/30 text-orange-400 border-orange-900',
    baja: 'bg-red-900/30 text-red-400 border-red-900',
    default: 'bg-gray-800 text-gray-300 border-gray-700'
};

export function Badge({ status, className, children }: BadgeProps) {
    const styles = statusStyles[status] || statusStyles.default;

    return (
        <span className={cn(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
            styles,
            className
        )}>
            {children || status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
}
