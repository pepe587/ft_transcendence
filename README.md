# ft_transcendence - Changelog

## NGINX
- Añadido proxy inverso para el frontend 'web'
- Añadido proxy inverso para el servicio 'gateway' (comentado)
- Eliminado el proxy inverso de Prometheus (innecesario)

## ELK (Elasticsearch, Logstash, Kibana)
- Añadida la capacidad de configurar nombre de usuario y contraseña de administrador (credenciales de admin por defecto)
- Desactivado el usuario predeterminado 'elastic' para mejorar la seguridad
- Automatizada la importación de opciones, patrones y dashboards
- Implementada secuencia de inicio: Kibana y Logstash ahora esperan a que Elasticsearch esté disponible
- Añadidas opciones de optimización de rendimiento

## Métricas (Prometheus y Grafana)
- Añadida la capacidad de configurar nombre de usuario y contraseña de administrador (credenciales de admin por defecto)
- Automatizada la importación de dashboards para visualización inmediata

## Redis
- Añadido soporte para configuración de contraseña (credenciales de admin por defecto)
- Creado mecanismo de comprobación de estado para asegurar que los microservicios esperen a que Redis esté disponible (health check)

## Web (Frontend)
- Creado contenedor para el frontend con estructura básica de directorios
- Incluida plantilla de página 'Home' para iniciar rápidamente el desarrollo

## Gateway
- Establecida estructura de directorios para API Gateway

## Template
- Creada estructura de directorios para el template de microservicios

## Makefile
- Eliminadas instrucciones redundantes
- Creadas reglas para limpiar, reconstruir y lanzar los contenedores

## .gitignore
- Añadido archivo .gitignore completo
- Excluidos archivos y directorios innecesarios

## .env
- Archivo de variables de entorno simplificado
- Variables opcionales, se reutiliza las credenciales de administrador
