## Descripcion

Microservicio de Node para el backend de OAuth.

## Características

- Que cosas chulas tiene

## Estructura

```
example/
├── src/
│   ├── app.js								- Aplicación principal
│   ├── config/
│   │   └── index.js						- Configuracion
│   ├── plugins/
│   │   └── plugin.js						- Plugins
│   ├── routes/
│   │   └── index.js						- Rutas
│   └── schemas/
│       └── index.js						- Schemas
├── Dockerfile.dev							- Dockerfile para desarrollo
├── Dockerfile								- Dockerfile para producción
└── package.json							- Dependencias
```

## Endpoints

- `GET /`									- Información de los endpoints
- `GET /health`								- Health check del servicio
- `GET /metrics`							- Métricas de Prometheus

## Métricas

Métricas en formato Prometheus en el endpoint `/metrics`.

- `http_requests_total`						- Total de solicitudes HTTP (por ejemplo)
