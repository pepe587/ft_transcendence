# Example

Estaria bien incluir este archivo con las cosas chulas que hace el microservicio

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
