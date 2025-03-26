# Gateway

Encargado de gestionar el tráfico entre clientes y microservicios, aplicando seguridad, rate limiting y registro de logs

## Características

- Reverse proxy para microservicios
- Monitoreo con Prometheus y logs centralizados
- Caché con Redis
- Rate limiting
- Seguridad y autenticación centralizada

## Estructura

```
gateway/
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
- `GET /health`								- Health check del gateway y servicios
- `GET /metrics`							- Métricas de Prometheus

## Métricas

Métricas en formato Prometheus en el endpoint `/metrics`.

- `http_requests_total`						- Total de solicitudes HTTP (por ejemplo)
