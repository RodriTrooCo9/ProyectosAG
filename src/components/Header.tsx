import { Layout, Maximize } from 'lucide-react';

interface HeaderProps {
  onLayout: () => void;
  onFitView: () => void;
}

export default function Header({ onLayout, onFitView }: HeaderProps) {
  return (
    <header className="absolute top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 shadow-sm z-50 flex items-center justify-between px-6">
      <div>
        <h1 className="text-xl font-black text-slate-800 tracking-tight">Arquitectura Kubernetes + GitOps</h1>
        <p className="text-xs font-semibold text-slate-500">Flujo de despliegue, seguridad, cómputo, observabilidad y persistencia</p>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={onLayout} className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors" title="Auto Layout">
          <Layout className="w-4 h-4" />
          <span>Auto Layout</span>
        </button>
        <button onClick={onFitView} className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors" title="Reset View">
          <Maximize className="w-4 h-4" />
          <span>Reset View</span>
        </button>
      </div>
    </header>
  );
}
