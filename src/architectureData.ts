import type { ArchitectureNode, ArchitectureEdge } from './types';
import { MarkerType } from '@xyflow/react';

const createEdge = (id: string, source: string, target: string, label: string, _type: string, color: string, animated = false): ArchitectureEdge => ({
  id,
  source,
  target,
  type: 'smoothstep',
  label,
  animated,
  style: { stroke: color, strokeWidth: 2 },
  markerEnd: { type: MarkerType.ArrowClosed, color },
  labelStyle: { fill: '#475569', fontWeight: 600, fontSize: 11 },
  labelBgStyle: { fill: '#ffffff', fillOpacity: 0.9 },
  labelBgPadding: [6, 4],
  labelBgBorderRadius: 4,
});

export const initialGroups: ArchitectureNode[] = [
  {
    id: 'group-ingress',
    type: 'architectureGroup',
    position: { x: 50, y: 350 },
    style: { width: 400, height: 450 },
    data: { title: 'CAPA DE ENTRADA & API GATEWAY', category: 'ingress', icon: 'globe', isGroup: true }
  },
  {
    id: 'group-gitops',
    type: 'architectureGroup',
    position: { x: 50, y: 50 },
    style: { width: 1550, height: 250 },
    data: { title: 'CAPA GITOPS & CONTROL PLANE (Declarativa)', category: 'gitops', icon: 'git-branch', isGroup: true }
  },
  {
    id: 'group-security',
    type: 'architectureGroup',
    position: { x: 500, y: 850 },
    style: { width: 500, height: 400 },
    data: { title: 'CAPA DE SEGURIDAD, RBAC Y GESTOR DE SECRETOS', category: 'security', icon: 'shield', isGroup: true }
  },
  {
    id: 'group-compute',
    type: 'architectureGroup',
    position: { x: 500, y: 350 },
    style: { width: 500, height: 450 },
    data: { title: 'CAPA DE CÓMPUTO & APLICACIÓN (Backend NestJS)', category: 'compute', icon: 'server', isGroup: true }
  },
  {
    id: 'group-persistence',
    type: 'architectureGroup',
    position: { x: 1050, y: 350 },
    style: { width: 550, height: 450 },
    data: { title: 'CAPA DE PERSISTENCIA & BASE DE DATOS', category: 'persistence', icon: 'database', isGroup: true }
  }
];

export const initialNodes: ArchitectureNode[] = [
  ...initialGroups,
  // INGRESS
  { id: 'client', type: 'architectureNode', parentId: 'group-ingress', position: { x: 50, y: 60 }, data: { title: 'Tráfico Externo', subtitle: 'Clientes', tech: 'HTTPS', category: 'ingress', icon: 'users', status: 'running', description: 'Tráfico entrante de usuarios.' } },
  { id: 'apisix', type: 'architectureNode', parentId: 'group-ingress', position: { x: 50, y: 190 }, data: { title: 'APISIX Route / Gateway', subtitle: 'apisix-route', tech: 'Apache APISIX', category: 'ingress', icon: 'globe', status: 'running', description: 'API Gateway.' } },
  { id: 'service', type: 'architectureNode', parentId: 'group-ingress', position: { x: 50, y: 320 }, data: { title: 'Kubernetes Service', subtitle: 'service', tech: 'K8s Service', category: 'ingress', icon: 'network', status: 'running', description: 'Balanceador de carga interno.' } },

  // GITOPS
  { id: 'git', type: 'architectureNode', parentId: 'group-gitops', position: { x: 50, y: 80 }, data: { title: 'Git Repository', subtitle: 'apps / components / config', tech: 'Git', category: 'gitops', icon: 'git-branch', status: 'configured', description: 'Fuente única de verdad.' } },
  { id: 'argocd', type: 'architectureNode', parentId: 'group-gitops', position: { x: 500, y: 80 }, data: { title: 'ArgoCD / ApplicationSet', subtitle: 'app-set.yaml', tech: 'ArgoCD', category: 'gitops', icon: 'settings', status: 'running', description: 'Controlador de despliegue continuo.' } },
  { id: 'crossplane', type: 'architectureNode', parentId: 'group-gitops', position: { x: 1050, y: 80 }, data: { title: 'Crossplane Operator', subtitle: 'crossplane-postgresql.yaml', tech: 'Crossplane', category: 'infrastructure', icon: 'settings', status: 'running', description: 'Provisionador cloud.' } },

  // SECURITY
  { id: 'vault', type: 'architectureNode', parentId: 'group-security', position: { x: 50, y: 60 }, data: { title: 'Bóveda Externa / Registry', subtitle: 'Vault / Harbor', tech: 'HashiCorp Vault', category: 'security', icon: 'lock', status: 'running', description: 'Almacén seguro.' } },
  { id: 'eso', type: 'architectureNode', parentId: 'group-security', position: { x: 50, y: 190 }, data: { title: 'External Secrets Operator', subtitle: 'external-secrets-env', tech: 'ESO', category: 'security', icon: 'shield', status: 'running', description: 'Sincroniza secretos.' } },
  { id: 'rbac', type: 'architectureNode', parentId: 'group-security', position: { x: 50, y: 310 }, data: { title: 'Control de Acceso RBAC', subtitle: 'ServiceAccount / RoleBinding', tech: 'K8s RBAC', category: 'security', icon: 'shield', status: 'configured', description: 'Gestión de permisos.' } },

  // COMPUTE
  { id: 'hpa', type: 'architectureNode', parentId: 'group-compute', position: { x: 50, y: 60 }, data: { title: 'Autoscaler', subtitle: 'horizontalpodautoscaler', tech: 'K8s HPA', category: 'compute', icon: 'activity', status: 'running', description: 'Escala automáticamente.' } },
  { id: 'deploy', type: 'architectureNode', parentId: 'group-compute', position: { x: 50, y: 190 }, data: { title: 'Deployment NestJS', subtitle: 'agente-nestjs-base', tech: 'Node.js / Nest', category: 'compute', icon: 'layers', status: 'running', replicas: 3, description: 'Despliegue del backend.', dependencies: ['Service', 'Secrets', 'PostgreSQL'] } },
  { id: 'pods', type: 'architectureNode', parentId: 'group-compute', position: { x: 50, y: 320 }, data: { title: 'Pods de Ejecución', subtitle: '[Pod] [Pod] [Pod] + N', tech: 'Docker', category: 'compute', icon: 'box', status: 'running', description: 'Contenedores en ejecución.' } },
  { id: 'sm', type: 'architectureNode', parentId: 'group-compute', position: { x: 280, y: 60 }, data: { title: 'Métricas & Monitoreo', subtitle: 'ServiceMonitor', tech: 'Prometheus', category: 'observability', icon: 'activity', status: 'running', description: 'Recolecta métricas.' } },

  // PERSISTENCE
  { id: 'job-db', type: 'architectureNode', parentId: 'group-persistence', position: { x: 50, y: 60 }, data: { title: 'Job Permisos DB', subtitle: 'grant-job-pg', tech: 'K8s Job', category: 'persistence', icon: 'play-circle', status: 'inactive', description: 'Asigna permisos iniciales.' } },
  { id: 'pg-cluster', type: 'architectureNode', parentId: 'group-persistence', position: { x: 50, y: 190 }, data: { title: 'PostgreSQL Cluster', subtitle: 'postgres-cluster', tech: 'PostgreSQL', category: 'persistence', icon: 'database', status: 'running', description: 'Base de datos relacional.' } },
  { id: 'backup', type: 'architectureNode', parentId: 'group-persistence', position: { x: 50, y: 320 }, data: { title: 'Respaldo Programado', subtitle: 'scheduled-backup', tech: 'CronJob', category: 'persistence', icon: 'clock', status: 'configured', description: 'Respaldos automatizados.' } },
  { id: 's3', type: 'architectureNode', parentId: 'group-persistence', position: { x: 280, y: 190 }, data: { title: 'Object Storage', subtitle: 'objectstore', tech: 'S3 Compatible', category: 'persistence', icon: 'hard-drive', status: 'running', description: 'Almacén de archivos estáticos.' } }
];

export const initialEdges: ArchitectureEdge[] = [
  createEdge('e-client-api', 'client', 'apisix', 'Petición HTTPS', 'data-flow', '#0EA5E9', true),
  createEdge('e-api-svc', 'apisix', 'service', 'Redirección Tráfico', 'data-flow', '#0EA5E9', true),
  createEdge('e-svc-deploy', 'service', 'deploy', 'Enruta', 'data-flow', '#0EA5E9', true),

  createEdge('e-git-argo', 'git', 'argocd', 'Sincroniza GitOps', 'gitops-flow', '#8B5CF6', true),
  createEdge('e-git-cross', 'git', 'crossplane', 'Sincroniza Infra', 'gitops-flow', '#8B5CF6', true),
  createEdge('e-argo-deploy', 'argocd', 'deploy', 'Aplica App', 'gitops-flow', '#8B5CF6', true),
  createEdge('e-cross-pg', 'crossplane', 'pg-cluster', 'Provisiona recursos', 'infrastructure-flow', '#64748B'),

  createEdge('e-vault-eso', 'vault', 'eso', 'Extrae Credenciales', 'security-flow', '#F59E0B'),
  createEdge('e-eso-pods', 'eso', 'pods', 'Inyecta Env / Claves', 'security-flow', '#F59E0B'),
  createEdge('e-rbac-pods', 'rbac', 'pods', 'Otorga Permisos', 'security-flow', '#F59E0B'),
  
  createEdge('e-hpa-deploy', 'hpa', 'deploy', 'Ajusta Réplicas', 'compute-flow', '#22C55E'),
  createEdge('e-deploy-pods', 'deploy', 'pods', 'Escala / Orquesta', 'compute-flow', '#22C55E'),
  
  createEdge('e-sm-pods', 'sm', 'pods', 'Recolecta Métricas', 'monitoring-flow', '#14B8A6'),
  createEdge('e-sm-hpa', 'sm', 'hpa', 'Escalado', 'monitoring-flow', '#14B8A6'),

  createEdge('e-job-pg', 'job-db', 'pg-cluster', 'Asigna Permisos', 'persistence-flow', '#64748B'),
  createEdge('e-pg-backup', 'pg-cluster', 'backup', 'Ejecuta Backup', 'persistence-flow', '#64748B'),
  createEdge('e-pods-pg', 'pods', 'pg-cluster', 'Conexión DB', 'data-flow', '#64748B', true),
  createEdge('e-pods-s3', 'pods', 's3', 'Guarda/Lee Archivos', 'data-flow', '#64748B', true),
];
