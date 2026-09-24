import { useState, useCallback, useMemo } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  Background,
  useReactFlow,
} from '@xyflow/react';
import type { Connection, Edge, Node } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { initialNodes, initialEdges } from './architectureData';
import ArchitectureNode from './components/ArchitectureNode';
import ArchitectureGroup from './components/ArchitectureGroup';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DetailsPanel from './components/DetailsPanel';
import Legend from './components/Legend';
import type { NodeCategory, ArchitectureNodeData } from './types';

function ArchitectureCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeData, setSelectedNodeData] = useState<ArchitectureNodeData | null>(null);
  
  const { fitView } = useReactFlow();

  const nodeTypes = useMemo(() => ({
    architectureNode: ArchitectureNode,
    architectureGroup: ArchitectureGroup
  }), []);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge({ ...params, type: 'smoothstep' }, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    if (!node.data.isGroup) {
      setSelectedNodeData(node.data as ArchitectureNodeData);
    }
  }, []);

  const handleSearch = useCallback((term: string) => {
    setNodes((nds) => 
      nds.map((n) => {
        if (!term) return { ...n, style: { ...n.style, opacity: 1 } };
        
        const match = 
          String(n.data.title || '').toLowerCase().includes(term.toLowerCase()) || 
          String(n.data.subtitle || '').toLowerCase().includes(term.toLowerCase());
        
        return {
          ...n,
          style: { ...n.style, opacity: match || n.data.isGroup ? 1 : 0.2 }
        };
      })
    );
  }, [setNodes]);

  const handleFilter = useCallback((category: NodeCategory | 'all') => {
    setNodes((nds) => 
      nds.map((n) => {
        if (category === 'all') return { ...n, hidden: false };
        
        // Group nodes and nodes of the matching category remain visible
        const isMatch = n.data.category === category || (n.data.isGroup && n.data.category === category);
        
        // Hide the node if it does not belong to the selected category (for groups, we might keep them if we want to show connections, but let's hide them)
        return {
          ...n,
          hidden: !isMatch
        };
      })
    );
    setTimeout(() => fitView({ duration: 800, padding: 0.2 }), 50);
  }, [setNodes, fitView]);

  const handleAutoLayout = useCallback(() => {
    // Simply reset to the carefully crafted initial layout
    setNodes([...initialNodes]);
    setEdges([...initialEdges]);
    setTimeout(() => fitView({ duration: 800, padding: 0.1 }), 50);
  }, [setNodes, setEdges, fitView]);

  const handleFitView = useCallback(() => {
    fitView({ duration: 800, padding: 0.1 });
  }, [fitView]);

  return (
    <div className="w-full h-screen bg-[#F8FAFC] flex flex-col overflow-hidden font-sans relative">
      <Header onLayout={handleAutoLayout} onFitView={handleFitView} />
      
      <Sidebar onSearch={handleSearch} onFilter={handleFilter} />
      
      <div className="flex-1 relative mt-16 ml-64">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.1 }}
          minZoom={0.1}
          maxZoom={1.5}
          defaultEdgeOptions={{ type: 'smoothstep' }}
          className="bg-[#F8FAFC]"
        >
          <Background color="#cbd5e1" gap={24} size={1.5} />
          <Controls className="bg-white border border-slate-200 shadow-sm rounded-lg" showInteractive={false} />
          <MiniMap 
            nodeColor={(n) => {
              if (n.data.category === 'ingress') return '#0EA5E9';
              if (n.data.category === 'gitops') return '#8B5CF6';
              if (n.data.category === 'security') return '#F59E0B';
              if (n.data.category === 'compute') return '#22C55E';
              if (n.data.category === 'persistence') return '#64748B';
              if (n.data.category === 'observability') return '#14B8A6';
              return '#cbd5e1';
            }}
            maskColor="rgba(248, 250, 252, 0.7)"
            className="border border-slate-200 shadow-sm rounded-lg overflow-hidden"
          />
        </ReactFlow>
        
        <Legend />
      </div>

      <DetailsPanel 
        nodeData={selectedNodeData} 
        onClose={() => setSelectedNodeData(null)} 
      />
    </div>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <ArchitectureCanvas />
    </ReactFlowProvider>
  );
}
