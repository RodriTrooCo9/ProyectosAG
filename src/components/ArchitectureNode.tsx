import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { 
  Server, Globe, Network, GitBranch, Settings, Workflow, 
  Lock, Shield, ShieldCheck, Activity, Layers, Box, 
  PlayCircle, Database, Clock, HardDrive, Users, Boxes
} from 'lucide-react';
import type { ArchitectureNodeData } from '../types';

const iconMap: Record<string, any> = {
  'server': Server, 'globe': Globe, 'network': Network, 'git-branch': GitBranch,
  'settings': Settings, 'workflow': Workflow, 'lock': Lock, 'shield': Shield,
  'shield-check': ShieldCheck, 'activity': Activity, 'layers': Layers, 'box': Box, 'boxes': Boxes,
  'play-circle': PlayCircle, 'database': Database, 'clock': Clock, 'hard-drive': HardDrive, 'users': Users
};

const categoryColors: Record<string, string> = {
  ingress: 'border-sky-500 text-sky-600',
  gitops: 'border-violet-500 text-violet-600',
  security: 'border-amber-500 text-amber-600',
  compute: 'border-green-500 text-green-600',
  persistence: 'border-slate-500 text-slate-600',
  observability: 'border-teal-500 text-teal-600',
  infrastructure: 'border-violet-500 text-violet-600',
};

const bgColors: Record<string, string> = {
  ingress: 'bg-sky-50',
  gitops: 'bg-violet-50',
  security: 'bg-amber-50',
  compute: 'bg-green-50',
  persistence: 'bg-slate-50',
  observability: 'bg-teal-50',
  infrastructure: 'bg-violet-50',
};

function ArchitectureNode({ data, selected }: { data: ArchitectureNodeData, selected?: boolean }) {
  const Icon = iconMap[data.icon] || Server;
  const borderColor = categoryColors[data.category] || 'border-gray-500';
  const bgColor = bgColors[data.category] || 'bg-white';
  
  return (
    <div className={`
      relative group flex flex-col min-w-[260px] bg-white rounded-lg shadow-sm 
      transition-all duration-200 cursor-pointer overflow-hidden
      ${selected ? 'ring-2 ring-blue-500 shadow-md' : 'hover:shadow-md'}
      ${borderColor} border-l-4 border-y border-r
    `}>
      {/* Handles */}
      <Handle type="target" position={Position.Top} id="top-target" className="w-2 h-2 opacity-0 group-hover:opacity-100" />
      <Handle type="source" position={Position.Top} id="top-source" className="w-2 h-2 opacity-0 group-hover:opacity-100" />
      <Handle type="target" position={Position.Bottom} id="bottom-target" className="w-2 h-2 opacity-0 group-hover:opacity-100" />
      <Handle type="source" position={Position.Bottom} id="bottom-source" className="w-2 h-2 opacity-0 group-hover:opacity-100" />
      <Handle type="target" position={Position.Left} id="left-target" className="w-2 h-2 opacity-0 group-hover:opacity-100" />
      <Handle type="source" position={Position.Left} id="left-source" className="w-2 h-2 opacity-0 group-hover:opacity-100" />
      <Handle type="target" position={Position.Right} id="right-target" className="w-2 h-2 opacity-0 group-hover:opacity-100" />
      <Handle type="source" position={Position.Right} id="right-source" className="w-2 h-2 opacity-0 group-hover:opacity-100" />

      {/* Header */}
      <div className={`flex items-center px-3 py-2 border-b border-gray-100 ${bgColor}`}>
        <Icon className={`w-5 h-5 mr-2 ${borderColor.replace('border-', 'text-')}`} />
        <div className="flex-1">
          <h3 className="text-sm font-bold text-slate-800 leading-tight">{data.title}</h3>
        </div>
        {data.status && (
          <div className="flex items-center ml-2" title={`Status: ${data.status}`}>
            <span className={`w-2.5 h-2.5 rounded-full ${
              data.status === 'running' ? 'bg-green-500' :
              data.status === 'warning' ? 'bg-yellow-500' :
              data.status === 'error' ? 'bg-red-500' :
              data.status === 'inactive' ? 'bg-gray-400' : 'bg-blue-500'
            }`} />
          </div>
        )}
      </div>

      {/* Body */}
      <div className="px-3 py-2 flex flex-col gap-1">
        {data.subtitle && (
          <span className="text-xs font-semibold text-slate-600">{data.subtitle}</span>
        )}
        {data.tech && (
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            {data.tech}
          </span>
        )}
      </div>
      
      {/* Tooltip on Hover via pure CSS / simple title */}
      <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-xs rounded p-2 -top-10 left-0 whitespace-nowrap pointer-events-none z-50">
        {data.description || data.title}
      </div>
    </div>
  );
}

export default memo(ArchitectureNode);
