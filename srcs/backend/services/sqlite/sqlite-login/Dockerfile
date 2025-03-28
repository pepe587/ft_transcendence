# Usamos imagen oficial de Alpine para correr SQLite en ella
FROM alpine:latest

# Refrescamos paquetes e instalamos SQLite
RUN apk update
RUN apk add sqlite

# Crea un directorio para almacenar la base de datos
RUN mkdir /data

# Copia un script SQL inicial al contenedor
COPY src/init.sql /init.sql

# Expone el puerto en el que tu aplicación escucha
EXPOSE 4003

# Ejecuta mediante sh, previo borrar la base de datos si existe,
# el script SQL para inicializar la base de datos y luego mantiene el contenedor en ejecución
CMD ["sh", "-c", "rm -f /data/database.sqlite && sqlite3 /data/database.sqlite < /init.sql && tail -f /dev/null"]