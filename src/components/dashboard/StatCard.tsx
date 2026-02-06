import { LucideIcon } from 'lucide-react';
import { Card } from '../ui/Card';

interface StatCardProps {
    title: string;
    value: number;
    icon: LucideIcon;
    description?: string;
}

export function StatCard({ title, value, icon: Icon, description }: StatCardProps) {
    return (
        <Card className="flex items-start justify-between">
            <div>
                <p className="text-sm font-medium text-secondary">{title}</p>
                <h3 className="mt-2 text-3xl font-bold text-primary">{value}</h3>
                {description && (
                    <p className="mt-1 text-xs text-secondary/80">{description}</p>
                )}
            </div>
            <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <Icon className="w-5 h-5 text-accent" />
            </div>
        </Card>
    );
}
