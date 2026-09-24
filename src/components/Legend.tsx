import { memo } from 'react';

function Legend() {
  return (
    <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur border border-slate-200 shadow-sm rounded-lg p-4 z-40 flex gap-8">
      <div>
        <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2">Componentes</h4>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
          <div className="flex items-center text-xs text-slate-600"><span className="w-2 h-2 rounded-full bg-sky-500 mr-2" /> Entrada & API</div>
          <div className="flex items-center text-xs text-slate-600"><span className="w-2 h-2 rounded-full bg-green-500 mr-2" /> Aplicación</div>
          <div className="flex items-center text-xs text-slate-600"><span className="w-2 h-2 rounded-full bg-violet-500 mr-2" /> GitOps</div>
          <div className="flex items-center text-xs text-slate-600"><span className="w-2 h-2 rounded-full bg-slate-500 mr-2" /> Persistencia</div>
          <div className="flex items-center text-xs text-slate-600"><span className="w-2 h-2 rounded-full bg-amber-500 mr-2" /> Seguridad</div>
          <div className="flex items-center text-xs text-slate-600"><span className="w-2 h-2 rounded-full bg-teal-500 mr-2" /> Observabilidad</div>
        </div>
      </div>
      <div className="w-px bg-slate-200"></div>
      <div>
        <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2">Flujos</h4>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center text-xs text-slate-600"><span className="text-[#0EA5E9] font-bold mr-2">→</span> Tráfico</div>
          <div className="flex items-center text-xs text-slate-600"><span className="text-[#8B5CF6] font-bold mr-2">⇢</span> GitOps</div>
          <div className="flex items-center text-xs text-slate-600"><span className="text-[#F59E0B] font-bold mr-2">⤴</span> Seguridad</div>
          <div className="flex items-center text-xs text-slate-600"><span className="text-[#64748B] font-bold mr-2">⤢</span> Infraestructura</div>
        </div>
      </div>
    </div>
  );
}

export default memo(Legend);
