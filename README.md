# Documentación y Datos: Arquitectura Interactiva Kubernetes + GitOps

Este documento contiene la especificación técnica y la estructura de datos JSON (para React Flow) necesaria para construir la aplicación web de visualización de arquitectura.

---

## 1. Especificación Técnica

### 1.1 Pila Tecnológica
* **Framework:** React con TypeScript.
* **Motor Core:** React Flow (`@xyflow/react`).
* **Estilos:** Tailwind CSS.
* **Iconografía:** Lucide React.
* **Layout:** ELK.js o Dagre (layout inicial automático).

### 1.2 Reglas de Diseño Visual
* **Colores por dominio:**
  * Entrada y API: `#0EA5E9` (Azul)
  * GitOps: `#8B5CF6` (Violeta)
  * Seguridad: `#F59E0B` (Naranja)
  * Cómputo: `#22C55E` (Verde)
  * Persistencia: `#64748B` (Slate)
* **Legibilidad:** Priorizar espacios en blanco. Los edges no deben atravesar los nodos. Los textos deben tener buen contraste sobre fondo `#F8FAFC`.

### 1.3 Interacción de Usuario
* **Nivel 1 (Overview):** Capas colapsadas mostrando flujos principales.
* **Nivel 2 (Detalle):** Al hacer doble clic en un Group Node, se expanden sus componentes internos.
* **Panel lateral:** Filtros por dominio y detalles del nodo seleccionado.
* **Búsqueda:** Auto-zoom y highlight del nodo encontrado.

---

## 2. Estructura de Datos (React Flow JSON)

El siguiente bloque de código contiene la estructura de datos separada (Nodes y Edges) lista para ser consumida por React Flow. Se utilizan Group Nodes para las capas y sub-nodos para los componentes.

```json
{
  "nodes": [
    {
      "id": "capa-entrada",
      "type": "architectureGroup",
      "data": { "title": "Capa de Entrada & API Gateway", "color": "#0EA5E9" },
      "position": { "x": 0, "y": 200 },
      "style": { "width": 300, "height": 400 }
    },
    {
      "id": "cliente",
      "type": "architectureNode",
      "parentNode": "capa-entrada",
      "extent": "parent",
      "position": { "x": 50, "y": 50 },
      "data": { "title": "Tráfico Externo", "subtitle": "HTTPS", "icon": "Globe" }
    },
    {
      "id": "apisix",
      "type": "architectureNode",
      "parentNode": "capa-entrada",
      "extent": "parent",
      "position": { "x": 50, "y": 150 },
      "data": { "title": "APISIX Route", "subtitle": "Gateway", "icon": "Network" }
    },
    {
      "id": "service",
      "type": "architectureNode",
      "parentNode": "capa-entrada",
      "extent": "parent",
      "position": { "x": 50, "y": 250 },
      "data": { "title": "Kubernetes Service", "subtitle": "service", "icon": "Server" }
    },

    {
      "id": "capa-gitops",
      "type": "architectureGroup",
      "data": { "title": "Capa GitOps & Control Plane", "color": "#8B5CF6" },
      "position": { "x": 400, "y": 0 },
      "style": { "width": 500, "height": 300 }
    },
    {
      "id": "git",
      "type": "architectureNode",
      "parentNode": "capa-gitops",
      "extent": "parent",
      "position": { "x": 150, "y": 50 },
      "data": { "title": "Git Repository", "subtitle": "apps / config", "icon": "GitBranch" }
    },
    {
      "id": "argocd",
      "type": "architectureNode",
      "parentNode": "capa-gitops",
      "extent": "parent",
      "position": { "x": 50, "y": 180 },
      "data": { "title": "ArgoCD", "subtitle": "app-set.yaml", "icon": "Workflow" }
    },
    {
      "id": "crossplane",
      "type": "architectureNode",
      "parentNode": "capa-gitops",
      "extent": "parent",
      "position": { "x": 250, "y": 180 },
      "data": { "title": "Crossplane Operator", "subtitle": "crossplane.yaml", "icon": "Layers" }
    },

    {
      "id": "capa-seguridad",
      "type": "architectureGroup",
      "data": { "title": "Capa Seguridad, RBAC y Secretos", "color": "#F59E0B" },
      "position": { "x": 400, "y": 350 },
      "style": { "width": 500, "height": 200 }
    },
    {
      "id": "vault",
      "type": "architectureNode",
      "parentNode": "capa-seguridad",
      "extent": "parent",
      "position": { "x": 50, "y": 50 },
      "data": { "title": "Bóveda Externa", "subtitle": "Vault / Harbor", "icon": "Lock" }
    },
    {
      "id": "eso",
      "type": "architectureNode",
      "parentNode": "capa-seguridad",
      "extent": "parent",
      "position": { "x": 250, "y": 50 },
      "data": { "title": "External Secrets Operator", "subtitle": "external-secret", "icon": "KeyRound" }
    },
    {
      "id": "rbac",
      "type": "architectureNode",
      "parentNode": "capa-seguridad",
      "extent": "parent",
      "position": { "x": 150, "y": 120 },
      "data": { "title": "Control RBAC", "subtitle": "ServiceAccount", "icon": "ShieldCheck" }
    },

    {
      "id": "capa-computo",
      "type": "architectureGroup",
      "data": { "title": "Capa de Cómputo & Aplicación", "color": "#22C55E" },
      "position": { "x": 1000, "y": 150 },
      "style": { "width": 400, "height": 450 }
    },
    {
      "id": "hpa",
      "type": "architectureNode",
      "parentNode": "capa-computo",
      "extent": "parent",
      "position": { "x": 50, "y": 50 },
      "data": { "title": "Autoscaler", "subtitle": "HPA", "icon": "Scaling" }
    },
    {
      "id": "deployment",
      "type": "architectureNode",
      "parentNode": "capa-computo",
      "extent": "parent",
      "position": { "x": 200, "y": 50 },
      "data": { "title": "Deployment NestJS", "subtitle": "base-backend", "icon": "Boxes", "status": "running" }
    },
    {
      "id": "prometheus",
      "type": "architectureNode",
      "parentNode": "capa-computo",
      "extent": "parent",
      "position": { "x": 50, "y": 180 },
      "data": { "title": "Métricas", "subtitle": "Prometheus", "icon": "Activity" }
    },
    {
      "id": "pods",
      "type": "architectureNode",
      "parentNode": "capa-computo",
      "extent": "parent",
      "position": { "x": 200, "y": 180 },
      "data": { "title": "Pods Ejecución", "subtitle": "[Pod]x3", "icon": "Box", "status": "running" }
    },

    {
      "id": "capa-persistencia",
      "type": "architectureGroup",
      "data": { "title": "Capa de Persistencia & Base de Datos", "color": "#64748B" },
      "position": { "x": 700, "y": 650 },
      "style": { "width": 600, "height": 300 }
    },
    {
      "id": "job-db",
      "type": "architectureNode",
      "parentNode": "capa-persistencia",
      "extent": "parent",
      "position": { "x": 50, "y": 50 },
      "data": { "title": "Job Permisos DB", "subtitle": "grants-job", "icon": "PlayCircle" }
    },
    {
      "id": "postgres",
      "type": "architectureNode",
      "parentNode": "capa-persistencia",
      "extent": "parent",
      "position": { "x": 250, "y": 50 },
      "data": { "title": "PostgreSQL Cluster", "subtitle": "postgres-cluster", "icon": "Database", "status": "running" }
    },
    {
      "id": "s3",
      "type": "architectureNode",
      "parentNode": "capa-persistencia",
      "extent": "parent",
      "position": { "x": 450, "y": 50 },
      "data": { "title": "Object Storage", "subtitle": "S3 Bucket", "icon": "HardDrive" }
    },
    {
      "id": "backup",
      "type": "architectureNode",
      "parentNode": "capa-persistencia",
      "extent": "parent",
      "position": { "x": 350, "y": 180 },
      "data": { "title": "Respaldo Programado", "subtitle": "scheduled-backup", "icon": "Archive" }
    }
  ],
  "edges": [
    { "id": "e-cli-api", "source": "cliente", "target": "apisix", "type": "data-flow", "label": "Petición HTTPS", "animated": true },
    { "id": "e-api-svc", "source": "apisix", "target": "service", "type": "data-flow", "label": "Redirección Tráfico", "animated": true },
    { "id": "e-svc-pods", "source": "service", "target": "pods", "type": "data-flow", "label": "Enruta Backend" },
    
    { "id": "e-git-argo", "source": "git", "target": "argocd", "type": "gitops-flow", "label": "Sincroniza GitOps" },
    { "id": "e-argo-deploy", "source": "argocd", "target": "deployment", "type": "gitops-flow", "label": "Deploy App" },
    { "id": "e-git-cross", "source": "git", "target": "crossplane", "type": "infrastructure-flow", "label": "Sincroniza Infra" },
    { "id": "e-cross-pg", "source": "crossplane", "target": "postgres", "type": "infrastructure-flow", "label": "Aprovisiona Cluster" },

    { "id": "e-vault-eso", "source": "vault", "target": "eso", "type": "security-flow", "label": "Extrae Credenciales" },
    { "id": "e-eso-pods", "source": "eso", "target": "pods", "type": "security-flow", "label": "Inyecta Envs/Claves" },
    { "id": "e-rbac-deploy", "source": "rbac", "target": "deployment", "type": "security-flow", "label": "Otorga Permisos" },

    { "id": "e-hpa-deploy", "source": "hpa", "target": "deployment", "type": "data-flow", "label": "Escala/Orquesta" },
    { "id": "e-deploy-pods", "source": "deployment", "target": "pods", "type": "data-flow", "label": "Gestiona" },
    { "id": "e-prom-pods", "source": "prometheus", "target": "pods", "type": "monitoring-flow", "label": "Recolecta Métricas" },
    { "id": "e-prom-hpa", "source": "prometheus", "target": "hpa", "type": "monitoring-flow", "label": "Ajusta Réplicas" },

    { "id": "e-job-pg", "source": "job-db", "target": "postgres", "type": "infrastructure-flow", "label": "Asigna Permisos" },
    { "id": "e-pods-pg", "source": "pods", "target": "postgres", "type": "data-flow", "label": "Conexión DB" },
    { "id": "e-pods-s3", "source": "pods", "target": "s3", "type": "data-flow", "label": "Guarda/Lee Archivos" },
    { "id": "e-pg-backup", "source": "postgres", "target": "backup", "type": "infrastructure-flow", "label": "Ejecuta Backup" },
    { "id": "e-backup-s3", "source": "backup", "target": "s3", "type": "infrastructure-flow", "label": "Sube Respaldo" }
  ]
}
