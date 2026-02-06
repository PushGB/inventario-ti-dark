import React, { useState } from 'react';
import { Box, Lock, User, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface LoginPageProps {
    onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate network delay for better UX
        setTimeout(() => {
            if (username === 'admin' && password === 'Isp2025.,') {
                onLogin();
            } else {
                setError('Credenciales inválidas. Intente nuevamente.');
                setIsLoading(false);
            }
        }, 800);
    };

    return (
        <div className="min-h-screen bg-[#121212] flex items-center justify-center p-4">
            <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-300">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-xl mb-6 shadow-lg shadow-white/10">
                        <Box className="w-8 h-8 text-black fill-current" />
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Inventario IT</h1>
                    <p className="text-[#9E9E9E] mt-2">Inicie sesión para acceder al sistema</p>
                </div>

                <Card className="border-[#333333] bg-[#1E1E1E]">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#E0E0E0]" htmlFor="username">
                                Usuario
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-[#9E9E9E]" />
                                </div>
                                <input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-[#252525] border border-[#333333] rounded-lg text-white placeholder-[#666666] focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-colors"
                                    placeholder="admin"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#E0E0E0]" htmlFor="password">
                                Contraseña
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-[#9E9E9E]" />
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-[#252525] border border-[#333333] rounded-lg text-white placeholder-[#666666] focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-colors"
                                    placeholder="•••••••"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-900/20 border border-red-900/50 rounded-lg p-3 text-sm text-red-500 text-center animate-in fade-in">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full h-12 text-base"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Verificando...' : 'Iniciar Sesión'}
                            {!isLoading && <ArrowRight className="ml-2 w-4 h-4" />}
                        </Button>
                    </form>
                </Card>

                <p className="text-center mt-6 text-sm text-[#666666]">
                    Credenciales de acceso restringido
                </p>
            </div>
        </div>
    );
}
