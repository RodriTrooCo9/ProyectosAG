import { memo } from 'react';
import type { ArchitectureNodeData } from '../types';

const categoryBorders: Record<string, string> = {
  ingress: 'border-sky-300',
  gitops: 'border-violet-300',
  security: 'border-amber-300',
  compute: 'border-green-300',
  persistence: 'border-slate-300',
  observability: 'border-teal-300',
  infrastructure: 'border-violet-300',
};

const categoryBgs: Record<string, string> = {
  ingress: 'bg-sky-50/40',
  gitops: 'bg-violet-50/40',
  security: 'bg-amber-50/40',
  compute: 'bg-green-50/40',
  persistence: 'bg-slate-50/40',
  observability: 'bg-teal-50/40',
  infrastructure: 'bg-violet-50/40',
};

const headerBgs: Record<string, string> = {
  ingress: 'bg-sky-100/80',
  gitops: 'bg-violet-100/80',
  security: 'bg-amber-100/80',
  compute: 'bg-green-100/80',
  persistence: 'bg-slate-100/80',
  observability: 'bg-teal-100/80',
  infrastructure: 'bg-violet-100/80',
};

function ArchitectureGroup({ data }: { data: ArchitectureNodeData }) {
  const borderColor = categoryBorders[data.category] || 'border-slate-300';
  const bgColor = categoryBgs[data.category] || 'bg-slate-50/40';
  const headerBg = headerBgs[data.category] || 'bg-slate-200/80';

  return (
    <div className={`w-full h-full rounded-xl border-2 border-dashed ${borderColor} ${bgColor} relative overflow-hidden backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-md`}>
      <div className={`absolute top-0 left-0 w-full px-6 py-2 border-b ${borderColor} ${headerBg} flex justify-between items-center`}>
        <span className="text-xs font-black text-slate-700 uppercase tracking-widest">{data.title}</span>
      </div>
    </div>
  );
}

export default memo(ArchitectureGroup);
