# Iconos del diagrama

Copias locales para que la generación no necesite conexión a Internet. D2 incorpora los SVG en el entregable mediante `--bundle=true`.

- Catálogo de D2: https://icons.d2lang.com/ — iconos genéricos y logos Git/PostgreSQL.
- Kubernetes: https://github.com/kubernetes/community/tree/master/icons — símbolos de recursos `pod`, `svc`, `deploy`, `rs`, `hpa`, `secret`, `sa`, `job`, `ing` y `crb`.
- CNCF Artwork: https://github.com/cncf/artwork — logos Argo, Prometheus y Harbor.

`origenes.json` registra la URL y SHA-256 de cada archivo. Los recursos Kubernetes conservan geometría y pintura; se retiraron metadatos del editor y atributos sin efecto visual que el exportador PNG de D2 0.9.0 no admite. También se retiraron `title`/`desc` de los logos CNCF. El hash original se conserva en `sha256_origen` cuando hubo adaptación.

Los símbolos son ilustrativos: un icono de Ingress representa la función de ApisixRoute, no afirma que el recurso sea de kind Ingress. Los iconos genéricos de control representan operadores; no identifican un producto concreto. Se conservan los colores propios de los iconos. Los fondos del diagrama son blancos.

Los iconos y marcas pertenecen a sus respectivos autores; consultar las condiciones de sus repositorios de origen. No se presentan como diseños propios.
