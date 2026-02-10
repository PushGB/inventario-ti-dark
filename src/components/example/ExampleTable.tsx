import { useEffect, useState } from "react";
import { getEquipos } from "../../services/equipo";
import { Equipo } from "../../models/equipo";

export function ExampleTable() {
    const [equipos, setEquipos] = useState<Equipo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getEquipos()
            .then(data => setEquipos(data))
            .catch(error => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Cargando equipos...</p>;

    return (
        <ul>
            {equipos.map(e => (
                <li key={e.id}>
                    {e.nombre} - {e.serie}
                </li>
            ))}
        </ul>
    );
};



// export function ExampleTable() {
//     return (
//         <div className="bg-[#1E1E1E] border border-[#333333] rounded-lg overflow-hidden">
//             <div className="p-6 border-b border-[#333333]">
//                 <h2 className="text-xl font-bold text-white mb-2">Tabla de Ejemplo</h2>
//                 <p className="text-[#9E9E9E]">Esta es una página de ejemplo creada a petición.</p>
//             </div>
//             <div className="p-6">
//                 <div className="overflow-x-auto">
//                     <table className="w-full text-left">
//                         <thead>
//                             <tr className="border-b border-[#333333]">
//                                 <th className="py-3 px-4 text-[#9E9E9E] font-medium text-sm">ID</th>
//                                 <th className="py-3 px-4 text-[#9E9E9E] font-medium text-sm">Nombre</th>
//                                 <th className="py-3 px-4 text-[#9E9E9E] font-medium text-sm">Estado</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr className="border-b border-[#333333] hover:bg-[#252525] transition-colors">
//                                 <td className="py-3 px-4 text-white">1</td>
//                                 <td className="py-3 px-4 text-white">Item de Ejemplo 1</td>
//                                 <td className="py-3 px-4">
//                                     <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-900/30 text-green-400">
//                                         Activo
//                                     </span>
//                                 </td>
//                             </tr>
//                             <tr className="border-b border-[#333333] hover:bg-[#252525] transition-colors">
//                                 <td className="py-3 px-4 text-white">2</td>
//                                 <td className="py-3 px-4 text-white">Item de Ejemplo 2</td>
//                                 <td className="py-3 px-4">
//                                     <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-900/30 text-blue-400">
//                                         Pendiente
//                                     </span>
//                                 </td>
//                             </tr>
//                             <tr className="hover:bg-[#252525] transition-colors">
//                                 <td className="py-3 px-4 text-white">3</td>
//                                 <td className="py-3 px-4 text-white">Item de Ejemplo 3</td>
//                                 <td className="py-3 px-4">
//                                     <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-900/30 text-red-400">
//                                         Inactivo
//                                     </span>
//                                 </td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// }