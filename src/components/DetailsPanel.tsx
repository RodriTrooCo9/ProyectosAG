import { X } from 'lucide-react';
import type { ArchitectureNodeData } from '../types';

interface DetailsPanelProps {
  nodeData: ArchitectureNodeData | null;
  onClose: () => void;
}

export default function DetailsPanel({ nodeData, onClose }: DetailsPanelProps) {
  if (!nodeData) return null;

  return (
    <aside className="absolute top-16 right-0 bottom-0 w-80 bg-white border-l border-slate-200 shadow-xl z-40 flex flex-col transform transition-transform">
      <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50">
        <h2 className="text-sm font-bold text-slate-800 truncate pr-4">{nodeData.title}</h2>
        <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-200 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="p-5 flex-1 overflow-y-auto">
        <div className="space-y-6">
          
          <div>
            <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Tipo / Categoría</h3>
            <p className="text-sm font-medium text-slate-700 capitalize">{nodeData.category}</p>
          </div>

          {nodeData.subtitle && (
            <div>
              <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Nombre / Recurso</h3>
              <p className="text-sm text-slate-700 font-mono bg-slate-100 p-1.5 rounded">{nodeData.subtitle}</p>
            </div>
          )}

          {nodeData.tech && (
            <div>
              <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Tecnología</h3>
              <span className="inline-block px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-md border border-blue-100">
                {nodeData.tech}
              </span>
            </div>
          )}

          {nodeData.description && (
            <div>
              <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Función</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{nodeData.description}</p>
            </div>
          )}

          {nodeData.replicas && (
            <div>
              <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Réplicas</h3>
              <p className="text-sm font-bold text-slate-700">{nodeData.replicas}</p>
            </div>
          )}

          {nodeData.dependencies && nodeData.dependencies.length > 0 && (
            <div>
              <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2">Dependencias</h3>
              <ul className="space-y-1">
                {nodeData.dependencies.map((dep, i) => (
                  <li key={i} className="text-sm text-slate-600 flex items-center before:content-['•'] before:mr-2 before:text-slate-400">
                    {dep}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {nodeData.status && (
            <div>
              <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Estado</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={`w-2.5 h-2.5 rounded-full ${
                  nodeData.status === 'running' ? 'bg-green-500' :
                  nodeData.status === 'warning' ? 'bg-yellow-500' :
                  nodeData.status === 'error' ? 'bg-red-500' :
                  nodeData.status === 'inactive' ? 'bg-gray-400' : 'bg-blue-500'
                }`} />
                <span className="text-sm font-medium text-slate-700 capitalize">{nodeData.status}</span>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </aside>
  );
}
