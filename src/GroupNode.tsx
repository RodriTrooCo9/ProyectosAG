import { memo } from 'react';

function GroupNode({ data }: any) {
  return (
    <div className="w-full h-full rounded-xl bg-slate-50/60 border border-slate-300 shadow-sm relative overflow-hidden backdrop-blur-sm">
      <div className="absolute top-0 left-0 w-full px-6 py-3 bg-slate-200/90 border-b border-slate-300">
        <span className="text-sm font-black text-slate-700 uppercase tracking-widest drop-shadow-sm">{data.label}</span>
      </div>
    </div>
  );
}

export default memo(GroupNode);
