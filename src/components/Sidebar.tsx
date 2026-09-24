import { useState } from 'react';
import { Search, Layers } from 'lucide-react';
import type { NodeCategory } from '../types';

interface SidebarProps {
  onSearch: (term: string) => void;
  onFilter: (category: NodeCategory | 'all') => void;
}

export default function Sidebar({ onSearch, onFilter }: SidebarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    onSearch(val);
  };

  const handleFilter = (cat: NodeCategory | 'all') => {
    setActiveFilter(cat);
    onFilter(cat);
  };

  const layers = [
    { id: 'all', label: 'Todas las capas' },
    { id: 'ingress', label: 'Entrada & API' },
    { id: 'gitops', label: 'GitOps & Control Plane' },
    { id: 'security', label: 'Seguridad & Secrets' },
    { id: 'compute', label: 'Cómputo & Aplicación' },
    { id: 'persistence', label: 'Persistencia & BD' },
    { id: 'observability', label: 'Observabilidad' },
  ];

  return (
    <aside className="absolute top-16 left-0 bottom-0 w-64 bg-white border-r border-slate-200 shadow-sm z-40 flex flex-col">
      {/* Search */}
      <div className="p-4 border-b border-slate-100">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar componentes..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Layers / Filters */}
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="flex items-center gap-2 mb-4 text-slate-700">
          <Layers className="w-4 h-4" />
          <h2 className="text-sm font-bold uppercase tracking-wider">Capas / Filtros</h2>
        </div>
        
        <div className="flex flex-col gap-1">
          {layers.map((layer) => (
            <button
              key={layer.id}
              onClick={() => handleFilter(layer.id as NodeCategory | 'all')}
              className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors text-left ${
                activeFilter === layer.id 
                  ? 'bg-blue-50 text-blue-700 font-semibold' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className={`w-2 h-2 rounded-full mr-3 ${
                layer.id === 'all' ? 'bg-slate-400' :
                layer.id === 'ingress' ? 'bg-sky-500' :
                layer.id === 'gitops' ? 'bg-violet-500' :
                layer.id === 'security' ? 'bg-amber-500' :
                layer.id === 'compute' ? 'bg-green-500' :
                layer.id === 'persistence' ? 'bg-slate-500' :
                'bg-teal-500'
              }`} />
              {layer.label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
