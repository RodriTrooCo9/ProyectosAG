# Plan de Trabajo y Guía Técnica: Automatización de Infraestructura Bare-Metal y Cluster Kubernetes (AGETIC)

---

## 1. Contexto General del Proyecto

El objetivo principal asignado al equipo de pasantes es diseñar e implementar un sistema de **instalación y aprovisionamiento 100% automatizado** para un conjunto de servidores físicos locales denominados informalmente **"chanchitos"**. 

La meta técnica final es lograr una arquitectura *"Zero-Touch Provisioning"* o *"Reset & Deploy"*:
* Al enviar una orden de reinicio o encender cualquiera de las máquinas físicas ("chanchitos"), la máquina debe bootear por red (**PXE**).
* El sistema identificará la máquina por su dirección física (**MAC Address**), le asignará una IP dentro de una red aislada y formateará e instalará automáticamente el sistema operativo base (**Debian 13**).
* Mediante archivos de configuración inicial (**cloud-init**), se reorientarán los repositorios de software hacia un servidor proxy local (**Sonatype**).
* Una vez finalizada la instalación del S.O., se desencadenarán recetas de automatización (**Ansible**) para preparar los nodos e instalar un cluster de Kubernetes orquestado mediante **RKE (Rancher Kubernetes Engine)**, finalizando con la configuración de un controlador de ingreso (**Ingress NGINX / APISIX**).

---

## 2. Diagnóstico Técnico y Solución de Red

### 2.1. Causa del Fallo Inicial con iVentoy y DHCP
Durante los primeros ensayos, las instalaciones por red fallaban de manera intermitente ("a veces daba y a veces no"). El análisis realizado por el tutor determinó las siguientes causas:
1. **Conexión al Switch Principal Institucional**: Las máquinas estaban conectadas físicamente al switch de la red general.
2. **Colisión de Broadcast y Conflicto DHCP**: Al activar servidores PXE / iVentoy en la red principal, las peticiones de broadcast colisionaban con el servidor DHCP institucional ("se estaba pisando el DHCP"), interfiriendo con el tráfico de la institución y provocando respuestas impredecibles en las máquinas.

### 2.2. Solución Planteada: Servidor Bastión y Red Aislada
Para resolver este problema de topología sin afectar la red institucional, se definió la siguiente estructura:
* **Switch Local Aislado**: Desconectar los "chanchitos" del switch grande y conectarlos a un switch local dedicado.
* **Servidor Bastión (Máquina Central)**:
  * Se selecciona uno de los "chanchitos" para cumplir la función de **Servidor Bastión / Servidor de Instalación**.
  * **Conexión Dual**: Se conecta a la red externa/Internet mediante **Wi-Fi** y se conecta al switch local de los chanchitos mediante cable **Ethernet**.
  * **Proxy Sonatype**: El Bastión alojará un repositorio proxy Sonatype. Toda descarga de paquetes para los demás nodos pasará por este proxy, evitando el consumo repetitivo de ancho de banda externo.
  * **DHCP y PXE Filtrado**: El Bastión responderá a las peticiones PXE/DHCP de la red local, entregando servicio de red únicamente a las direcciones MAC previamente registradas.

---

## 3. Inventario y Control de Recursos

Antes de iniciar los despliegues automatizados, es requisito obligatorio consolidar una tabla de inventario de los nodos ("chanchitos"). Para cada máquina se debe registrar:
1. **Dirección MAC** (Interfaz de red Ethernet).
2. **Memoria RAM disponible**.
3. **Capacidad de Disco Rígido / SSD**.
4. **Procesador / Cores CPU**.

*Propósito del inventario*: Permitir que el servidor PXE identifique inequívocamente cada nodo por su MAC, le asigne una dirección IP estática/reservada y aplique la configuración de disco y recursos adecuada durante el formateo.

---

## 4. Stack Tecnológico Explicado

* **PXE / iVentoy / Servidor de Booteo por Red**: Permite que las máquinas enciendan y carguen el instalador del sistema operativo desde la red sin necesidad de pendrives ni medios físicos.
* **Debian 13**: Sistema operativo Linux seleccionado como distribución base para los nodos.
* **cloud-init / Archivo Custom de Configuración**: Script/archivo de personalización que se ejecuta al momento de instalar el S.O. Su función crítica en este proyecto es reconfigurar el archivo de fuentes (`apt sources`) para que Apunte al proxy local **Sonatype** en lugar de los repositorios oficiales en Internet.
* **Sonatype (Nexus / Proxy Repository)**: Servidor repositorio intermedio alojado en el Bastión para cachear paquetes Debian, dependencias de Kubernetes y contenedores.
* **HashiCorp Packer**: Herramienta para crear e empaquetar imágenes de sistemas operativos preconfiguradas y estandarizadas. Se evaluará su integración con el flujo de booteo por red.
* **Ansible**: Herramienta de automatización basada en recetas (Playbooks) que se ejecutará sobre las máquinas recién instaladas para aplicar configuraciones de seguridad, instalar paquetes base y preparar el entorno para Kubernetes.
* **RKE (Rancher Kubernetes Engine)**: Sabor/distribución libre de Kubernetes desarrollada por Rancher. Simplifica la instalación y gestión del cluster K8s mediante un archivo de declaración YAML.
* **Ingress Controller (NGINX / APISIX)**: Componente del cluster encargado de gestionar el tráfico de red de entrada, enrutando peticiones externas hacia los servicios internos del cluster.

---

## 5. Análisis de Personajes y Dinámica de Trabajo

### 5.1. El Tutor / Responsable Técnico
* **Rol**: Mentor y Arquitecto de Sistemas.
* **Aportes clave**: Diagnostica el problema de colisión de broadcast en la red, diseña la solución del servidor Bastión en modo Dual (Wi-Fi + Ethernet), establece el stack tecnológico (RKE, Ansible, cloud-init, Sonatype, Packer) y define el alcance del proyecto.
* **Metodología**: Promueve el aprendizaje práctico, sugiere resolver la asignación de tareas mediante juegos dinámicos ("piedra, papel o tijera") y proyecta la transición del equipo hacia el desarrollo Frontend tras completar la infraestructura.

### 5.2. Pasante 1 (Especialista en Red, Aprovisionamiento y Bastión)
* **Rol**: Encargado del despliegue bare-metal y la capa de red inicial.
* **Forma de asignación**: Seleccionado tras ganar/perder en "piedra, papel o tijera".
* **Enfoque**: Red aislada, servidor PXE/iVentoy, servidor Bastión, repositorio Sonatype, plantillas `cloud-init` y evaluación de Packer.

### 5.3. Pasante 2 (Especialista en Automatización, Kubernetes e Ingress)
* **Rol**: Encargado de la orquestación y configuración del cluster.
* **Forma de asignación**: Asume el rol complementario tras la dinámica inicial.
* **Enfoque**: Creación de Playbooks de Ansible, despliegue del cluster con RKE y configuración del Ingress Controller (NGINX o Apache APISIX).

### 5.4. Dinámica de Colaboración
* Muestran un ambiente de aprendizaje activo y abierto.
* Utilizan herramientas de registro y documentación durante las explicaciones ("estás anotando", "he grabado todo, te paso todo").
* Poseen experiencia previa e interés en desarrollo Frontend (mencionando tecnologías como **React**, **Angular** y **Vue**), lo cual se aprovechará en la siguiente etapa del proyecto.

---

## 6. Matriz de Tareas y Distribución de Roles

| Área / Módulo | Tarea / Entregable Específico | Responsable |
| :--- | :--- | :--- |
| **Inventario de Hardware** | Relevar y documentar MAC Address, RAM, Disco y CPU de todos los "chanchitos". | Pasante 1 & Pasante 2 |
| **Configuración de Red / Bastión** | Configurar 1 máquina como Bastión con Wi-Fi (Internet) y Ethernet al switch local. | Pasante 1 |
| **Repositorio Proxy** | Desplegar y validar el servidor proxy **Sonatype** en el Bastión. | Pasante 1 |
| **Booteo PXE y Cloud-Init** | Configurar iVentoy/PXE con `cloud-init` para modifcar `apt sources` hacia Sonatype. | Pasante 1 |
| **Empaquetado de Imágenes** | Investigar y probar **Packer** para la generación de imágenes base de Debian 13. | Pasante 1 |
| **Automatización Post-Instalación** | Desarrollar recetas de **Ansible** para preparar los nodos tras la instalación del S.O. | Pasante 2 |
| **Despliegue de Kubernetes** | Configurar y ejecutar **RKE** para levantar el cluster de Kubernetes sobre los nodos. | Pasante 2 |
| **Controlador de Ingreso** | Investigar y desplegar **Ingress NGINX** o **Apache APISIX** en el cluster RKE. | Pasante 2 |

---

## 7. Roadmap y Cronograma Proyectado

1. **Fase 1: Infraestructura Base y Red Aislada (Semanas 1 - 2)**
   * Aislamiento de red y armado del Servidor Bastión.
   * Inventariado de direcciones MAC.
   * Instalación automatizada Debian 13 vía PXE + `cloud-init` + Sonatype.
2. **Fase 2: Aprovisionamiento y Cluster Kubernetes (Semana 2)**
   * Ejecución de Playbooks de Ansible sobre los nodos Debian.
   * Despliegue de RKE y verificación del estado de los nodos del cluster.
   * Configuración e integración del Ingress Controller (NGINX / APISIX).
3. **Fase 3: Desarrollo Frontend (A partir de la Semana 2/3)**
   * Transición del equipo hacia el desarrollo de aplicaciones Frontend en React / Angular / Vue sobre la infraestructura previamente construida.
