import { type Node, type Edge } from '@xyflow/react';

export type NodeCategory = 'ingress' | 'gitops' | 'security' | 'compute' | 'persistence' | 'observability' | 'infrastructure';
export type NodeStatus = 'running' | 'warning' | 'error' | 'inactive' | 'configured';

export interface ArchitectureNodeData extends Record<string, unknown> {
  title: string;
  subtitle?: string;
  tech?: string;
  description?: string;
  category: NodeCategory;
  icon: string;
  status?: NodeStatus;
  replicas?: number;
  dependencies?: string[];
  isGroup?: boolean;
  collapsed?: boolean;
}

export type ArchitectureNode = Node<ArchitectureNodeData>;
export type ArchitectureEdge = Edge;
