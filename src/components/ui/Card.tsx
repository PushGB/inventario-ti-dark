import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
    return (
        <div
            className={cn("bg-surface border border-border rounded-lg p-6 shadow-sm", className)}
            {...props}
        >
            {children}
        </div>
    );
}
