import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { 
  Folder, 
  FileText, 
  Box, 
  Activity, 
  Route, 
  Lock, 
  Monitor, 
  Network,
  Database,
  Users,
  Settings,
  Shield,
  User,
  Clock
} from 'lucide-react';

const iconMap: Record<string, any> = {
  folder: Folder,
  file: FileText,
  box: Box,
  activity: Activity,
  route: Route,
  lock: Lock,
  monitor: Monitor,
  network: Network,
  database: Database,
  users: Users,
  settings: Settings,
  shield: Shield,
  user: User,
  clock: Clock
};

const colorStyles: Record<string, string> = {
  slate: 'border-slate-300 bg-slate-50/90 text-slate-700 hover:border-slate-400 hover:shadow-slate-200/50',
  blue: 'border-blue-400 bg-blue-50/90 text-blue-700 hover:border-blue-500 hover:shadow-blue-200/50',
  green: 'border-emerald-400 bg-emerald-50/90 text-emerald-700 hover:border-emerald-500 hover:shadow-emerald-200/50',
  purple: 'border-purple-400 bg-purple-50/90 text-purple-700 hover:border-purple-500 hover:shadow-purple-200/50',
  orange: 'border-orange-400 bg-orange-50/90 text-orange-700 hover:border-orange-500 hover:shadow-orange-200/50',
  pink: 'border-pink-400 bg-pink-50/90 text-pink-700 hover:border-pink-500 hover:shadow-pink-200/50',
  teal: 'border-teal-400 bg-teal-50/90 text-teal-700 hover:border-teal-500 hover:shadow-teal-200/50',
  yellow: 'border-amber-400 bg-amber-50/90 text-amber-700 hover:border-amber-500 hover:shadow-amber-200/50',
  red: 'border-rose-400 bg-rose-50/90 text-rose-700 hover:border-rose-500 hover:shadow-rose-200/50',
  gray: 'border-gray-400 bg-gray-50/90 text-gray-700 hover:border-gray-500 hover:shadow-gray-200/50',
};

const iconColorMap: Record<string, string> = {
  slate: 'text-slate-500 bg-slate-200/50',
  blue: 'text-blue-500 bg-blue-200/50',
  green: 'text-emerald-500 bg-emerald-200/50',
  purple: 'text-purple-500 bg-purple-200/50',
  orange: 'text-orange-500 bg-orange-200/50',
  pink: 'text-pink-500 bg-pink-200/50',
  teal: 'text-teal-500 bg-teal-200/50',
  yellow: 'text-amber-500 bg-amber-200/50',
  red: 'text-rose-500 bg-rose-200/50',
  gray: 'text-gray-500 bg-gray-200/50',
};

const badgeColorMap: Record<string, string> = {
  slate: 'bg-slate-200 text-slate-700 border-slate-300',
  blue: 'bg-blue-200 text-blue-800 border-blue-300',
  green: 'bg-emerald-200 text-emerald-800 border-emerald-300',
  purple: 'bg-purple-200 text-purple-800 border-purple-300',
  orange: 'bg-orange-200 text-orange-800 border-orange-300',
  pink: 'bg-pink-200 text-pink-800 border-pink-300',
  teal: 'bg-teal-200 text-teal-800 border-teal-300',
  yellow: 'bg-amber-200 text-amber-800 border-amber-300',
  red: 'bg-rose-200 text-rose-800 border-rose-300',
  gray: 'bg-gray-200 text-gray-800 border-gray-300',
};

function CustomNode({ data, isConnectable }: any) {
  const Icon = iconMap[data.icon || 'folder'];
  const colorKey = data.color || 'slate';
  const nodeStyle = colorStyles[colorKey] || colorStyles.slate;
  const iconStyle = iconColorMap[colorKey] || iconColorMap.slate;
  const badgeStyle = badgeColorMap[colorKey] || badgeColorMap.slate;

  return (
    <div className={`group px-4 py-3 shadow-lg rounded-2xl border-2 flex flex-col gap-2 min-w-[240px] max-w-[350px] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl backdrop-blur-md z-10 ${nodeStyle}`}>
      <Handle type="target" position={Position.Top} id="top-target" isConnectable={isConnectable} className="w-3 h-3 border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity" />
      <Handle type="source" position={Position.Top} id="top-source" isConnectable={isConnectable} className="w-3 h-3 border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity" />
      <Handle type="target" position={Position.Left} id="left-target" isConnectable={isConnectable} className="w-3 h-3 border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity" />
      <Handle type="source" position={Position.Left} id="left-source" isConnectable={isConnectable} className="w-3 h-3 border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex items-center gap-4">
        <div className={`p-2.5 rounded-xl shadow-inner flex-shrink-0 ${iconStyle}`}>
          <Icon className="w-6 h-6 drop-shadow-sm" strokeWidth={2.5} />
        </div>
        
        <div className="flex flex-col flex-grow justify-center truncate">
          {data.badge && (
            <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full w-max mb-1.5 border shadow-sm ${badgeStyle}`}>
              {data.badge}
            </span>
          )}
          <span className="font-bold text-gray-800 text-sm break-words whitespace-normal leading-snug drop-shadow-sm">
            {data.label}
          </span>
          {data.sublabel && (
            <span className="text-xs font-medium text-gray-500 mt-1 uppercase tracking-wide">
              {data.sublabel}
            </span>
          )}
        </div>
      </div>

      <Handle type="target" position={Position.Right} id="right-target" isConnectable={isConnectable} className="w-3 h-3 border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity" />
      <Handle type="source" position={Position.Right} id="right-source" isConnectable={isConnectable} className="w-3 h-3 border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity" />
      <Handle type="target" position={Position.Bottom} id="bottom-target" isConnectable={isConnectable} className="w-3 h-3 border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity" />
      <Handle type="source" position={Position.Bottom} id="bottom-source" isConnectable={isConnectable} className="w-3 h-3 border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}

export default memo(CustomNode);
