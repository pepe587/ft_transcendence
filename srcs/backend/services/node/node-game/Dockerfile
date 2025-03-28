# Usamos imagen oficial de Node.js
FROM node:latest

# Copia solo los archivos necesarios para instalar dependencias
COPY package.json .

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto
COPY src/app.js .

# Crea un certificado SSL autosignado
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/ssl/private/server.key \
    -out /etc/ssl/certs/server.crt \
    -subj "/C=ES/ST=Andalucia/L=Malaga/O=42 Malaga/OU=Formacion/CN=localhost"

# Expone el puerto en el que tu aplicación escucha
EXPOSE 4002

# Ejecuta la aplicación
CMD ["node", "app.js"]