# Usamos imagen oficial de Node.js
FROM node:latest

# Establece el directorio de trabajo dentro del contenedor
#WORKDIR /src

# Copia solo los archivos necesarios para instalar dependencias
COPY package.json .

# Crea un certificado SSL autosignado
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/ssl/private/server.key \
    -out /etc/ssl/certs/server.crt \
    -subj "/C=ES/ST=Andalucia/L=Malaga/O=42 Malaga/OU=Formacion/CN=localhost"

RUN ls / >&2

# Instala las dependencias
RUN npm install


# Copia el resto de los archivos del proyecto
COPY src/app.js .


# Expone el puerto en el que tu aplicación escucha
EXPOSE 4001


# Ejecuta la aplicación
CMD ["node", "app.js"]