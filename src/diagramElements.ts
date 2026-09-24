import { type Node, type Edge, MarkerType } from '@xyflow/react';

const SWIMLANE_WIDTH = 1500;

export const initialNodes: Node[] = [
  // --- SWIMLANES (GROUPS) ---
  {
    id: 's01',
    type: 'group',
    position: { x: 50, y: 50 },
    style: { width: SWIMLANE_WIDTH, height: 250 },
    data: { label: '01 - ORIGEN Y RECONCILIACIÓN GITOPS' }
  },
  {
    id: 's03',
    type: 'group',
    position: { x: 50, y: 350 },
    style: { width: SWIMLANE_WIDTH, height: 350 },
    data: { label: '03 - APLICACIÓN Y DATOS' }
  },
  {
    id: 's04',
    type: 'group',
    position: { x: 50, y: 750 },
    style: { width: SWIMLANE_WIDTH, height: 250 },
    data: { label: '04 - SECRETOS E IMÁGENES' }
  },
  {
    id: 's05',
    type: 'group',
    position: { x: 50, y: 1050 },
    style: { width: SWIMLANE_WIDTH, height: 350 },
    data: { label: '05 - PERSISTENCIA, RESPALDOS Y OBSERVABILIDAD' }
  },
  {
    id: 's06',
    type: 'group',
    position: { x: 50, y: 1450 },
    style: { width: SWIMLANE_WIDTH, height: 250 },
    data: { label: '06 - ALCANCE Y PERMISOS' }
  },

  // --- S01 NODES ---
  {
    id: 'git',
    type: 'custom',
    parentId: 's01',
    position: { x: 50, y: 80 },
    data: { label: 'Git Repository', sublabel: '(repos - completo / crossplane)', icon: 'folder', color: 'purple' }
  },
  {
    id: 'argocd',
    type: 'custom',
    parentId: 's01',
    position: { x: 600, y: 80 },
    data: { label: 'ArgoCD / ApplicationSet', sublabel: '(app-set.yaml / app.yaml)', icon: 'settings', color: 'purple' }
  },
  {
    id: 'crossplane',
    type: 'custom',
    parentId: 's01',
    position: { x: 1100, y: 80 },
    data: { label: 'Crossplane Operator', sublabel: '(crossplane-postgresql.yaml)', icon: 'settings', color: 'purple' }
  },

  // --- S03 NODES ---
  {
    id: 'ext-traffic',
    type: 'custom',
    parentId: 's03',
    position: { x: 50, y: 150 },
    data: { label: 'Tráfico Externo / Clientes', sublabel: '(HTTPS)', icon: 'network', color: 'blue' }
  },
  {
    id: 'apisix',
    type: 'custom',
    parentId: 's03',
    position: { x: 350, y: 150 },
    data: { label: 'APISIX Route / Gateway', sublabel: '(apisixroute)', icon: 'route', color: 'blue' }
  },
  {
    id: 'svc',
    type: 'custom',
    parentId: 's03',
    position: { x: 650, y: 150 },
    data: { label: 'Kubernetes Service', sublabel: '(service)', icon: 'network', color: 'blue' }
  },
  {
    id: 'hpa',
    type: 'custom',
    parentId: 's03',
    position: { x: 950, y: 60 },
    data: { label: 'Autoescalador', sublabel: '(horizontalpodautoscaler)', icon: 'activity', color: 'green' }
  },
  {
    id: 'deploy',
    type: 'custom',
    parentId: 's03',
    position: { x: 950, y: 220 },
    data: { label: 'Deployment NestJS', sublabel: '(agetic-nestjs-base-backend)', icon: 'box', color: 'green' }
  },
  {
    id: 'pods',
    type: 'custom',
    parentId: 's03',
    position: { x: 1250, y: 150 },
    data: { label: 'Pods Ejecución', sublabel: '(pod)', icon: 'box', color: 'pink', badge: 'Ejecución' }
  },

  // --- S04 NODES ---
  {
    id: 'vault',
    type: 'custom',
    parentId: 's04',
    position: { x: 50, y: 100 },
    data: { label: 'Bóveda Externa / Registry', sublabel: '(Vault / Harbor Secret)', icon: 'lock', color: 'orange' }
  },
  {
    id: 'eso',
    type: 'custom',
    parentId: 's04',
    position: { x: 650, y: 100 },
    data: { label: 'External Secrets Operator', sublabel: '(secretstore / externalsecret-env)', icon: 'lock', color: 'orange' }
  },

  // --- S05 NODES ---
  {
    id: 'backup',
    type: 'custom',
    parentId: 's05',
    position: { x: 50, y: 200 },
    data: { label: 'Respaldo Programado', sublabel: '(scheduled-backup)', icon: 'clock', color: 'slate' }
  },
  {
    id: 's3',
    type: 'custom',
    parentId: 's05',
    position: { x: 350, y: 200 },
    data: { label: 'Almacenamiento Objetos', sublabel: '(objectstore)', icon: 'database', color: 'slate' }
  },
  {
    id: 'pg-cluster',
    type: 'custom',
    parentId: 's05',
    position: { x: 650, y: 200 },
    data: { label: 'PostgreSQL Cluster', sublabel: '(postgres-cluster)', icon: 'database', color: 'blue' }
  },
  {
    id: 'db-logic',
    type: 'custom',
    parentId: 's05',
    position: { x: 950, y: 200 },
    data: { label: 'Base de Datos Lógica', sublabel: '(postgreSQLDatabase / db-role)', icon: 'database', color: 'blue' }
  },
  {
    id: 'job-db',
    type: 'custom',
    parentId: 's05',
    position: { x: 950, y: 60 },
    data: { label: 'Job Permisos DB', sublabel: '(grants-job-pg)', icon: 'settings', color: 'slate' }
  },
  {
    id: 'sm',
    type: 'custom',
    parentId: 's05',
    position: { x: 1250, y: 60 },
    data: { label: 'Métricas & Monitoreo', sublabel: '(ServiceMonitor / Prometheus)', icon: 'monitor', color: 'green' }
  },

  // --- S06 NODES ---
  {
    id: 'rbac',
    type: 'custom',
    parentId: 's06',
    position: { x: 650, y: 80 },
    data: { label: 'Control de Acceso RBAC', sublabel: '(ServiceAccount / ClusterRoleBinding)', icon: 'shield', color: 'orange' }
  },
];

const defaultEdgeOptions = {
  type: 'smoothstep',
  markerEnd: { type: MarkerType.ArrowClosed, color: '#64748b' },
  style: { strokeWidth: 2, stroke: '#64748b' },
  labelStyle: { fill: '#475569', fontWeight: 600, fontSize: 10 },
  labelBgStyle: { fill: '#f8fafc', fillOpacity: 0.8 },
  labelBgPadding: [4, 4] as [number, number],
  labelBgBorderRadius: 4,
};

export const initialEdges: Edge[] = [
  // GitOps
  { id: 'e-git-argocd', source: 'git', target: 'argocd', label: 'Sincroniza GitOps', sourceHandle: 'right-source', targetHandle: 'left-target', ...defaultEdgeOptions },
  { id: 'e-git-crossplane', source: 'git', target: 'crossplane', label: 'Sincroniza Infra', sourceHandle: 'right-source', targetHandle: 'left-target', ...defaultEdgeOptions },
  
  // App / Traffic
  { id: 'e-ext-apisix', source: 'ext-traffic', target: 'apisix', label: 'Peticiones HTTPS', sourceHandle: 'right-source', targetHandle: 'left-target', ...defaultEdgeOptions },
  { id: 'e-apisix-svc', source: 'apisix', target: 'svc', label: 'Redirecciona Tráfico', sourceHandle: 'right-source', targetHandle: 'left-target', ...defaultEdgeOptions },
  { id: 'e-svc-pods', source: 'svc', target: 'pods', label: 'Balancea Carga', sourceHandle: 'right-source', targetHandle: 'left-target', ...defaultEdgeOptions },
  { id: 'e-hpa-deploy', source: 'hpa', target: 'deploy', label: 'Ajusta Réplicas', sourceHandle: 'bottom-source', targetHandle: 'top-target', ...defaultEdgeOptions },
  { id: 'e-deploy-pods', source: 'deploy', target: 'pods', label: 'Escala / Orquesta', sourceHandle: 'right-source', targetHandle: 'left-target', ...defaultEdgeOptions },

  // Deployments (ArgoCD to App & Secrets)
  { id: 'e-argo-apisix', source: 'argocd', target: 'apisix', label: 'Deploy Routes', sourceHandle: 'left-source', targetHandle: 'top-target', ...defaultEdgeOptions },
  { id: 'e-argo-deploy', source: 'argocd', target: 'deploy', label: 'Deploy App', sourceHandle: 'right-source', targetHandle: 'top-target', ...defaultEdgeOptions },
  { id: 'e-argo-eso', source: 'argocd', target: 'eso', label: 'Deploy Secrets Config', sourceHandle: 'bottom-source', targetHandle: 'top-target', ...defaultEdgeOptions },

  // Secrets
  { id: 'e-vault-eso', source: 'vault', target: 'eso', label: 'Extrae Credenciales', sourceHandle: 'right-source', targetHandle: 'left-target', ...defaultEdgeOptions },
  { id: 'e-eso-pods', source: 'eso', target: 'pods', label: 'Inyecta Envs / Claves', sourceHandle: 'right-source', targetHandle: 'bottom-target', ...defaultEdgeOptions },
  
  // Persistence / Observability
  { id: 'e-sm-pods', source: 'sm', target: 'pods', label: 'Recolecta Métricas', sourceHandle: 'top-source', targetHandle: 'bottom-target', ...defaultEdgeOptions },
  { id: 'e-pods-db', source: 'pods', target: 'db-logic', label: 'Conexión Lectura/Escritura', sourceHandle: 'bottom-source', targetHandle: 'top-target', ...defaultEdgeOptions },
  { id: 'e-pods-s3', source: 'pods', target: 's3', label: 'Guarda/Lee Archivos', sourceHandle: 'left-source', targetHandle: 'top-target', ...defaultEdgeOptions },
  
  // Crossplane
  { id: 'e-crossplane-pg', source: 'crossplane', target: 'pg-cluster', label: 'Aprovisiona Cluster DB', sourceHandle: 'bottom-source', targetHandle: 'top-target', ...defaultEdgeOptions },
  { id: 'e-crossplane-s3', source: 'crossplane', target: 's3', label: 'Aprovisiona Bucket S3', sourceHandle: 'bottom-source', targetHandle: 'top-target', ...defaultEdgeOptions },

  // DB logic
  { id: 'e-job-db', source: 'job-db', target: 'db-logic', label: 'Asigna Permisos', sourceHandle: 'bottom-source', targetHandle: 'top-target', ...defaultEdgeOptions },
  { id: 'e-pg-db', source: 'pg-cluster', target: 'db-logic', label: 'Contiene DBs', sourceHandle: 'right-source', targetHandle: 'left-target', ...defaultEdgeOptions },
  { id: 'e-backup-pg', source: 'backup', target: 'pg-cluster', label: 'Exec Backup', sourceHandle: 'right-source', targetHandle: 'left-target', ...defaultEdgeOptions },

  // RBAC
  { id: 'e-rbac-pods', source: 'rbac', target: 'pods', label: 'Aplica RBAC / Otorga Permisos', sourceHandle: 'right-source', targetHandle: 'left-target', ...defaultEdgeOptions },
];
