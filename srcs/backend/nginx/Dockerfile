# Base image for building the application
FROM nginx:1.25.5-alpine

# Install OpenSSL
RUN apk add --no-cache openssl

# Create a self-signed SSL certificate
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/ssl/private/server.key \
    -out /etc/ssl/certs/server.crt \
    -subj "/C=ES/ST=Andalucia/L=Malaga/O=42 Malaga/OU=Formacion/CN=localhost"

# Copy configuration
COPY config/nginx.conf /etc/nginx/nginx.conf

ARG HOST_NAME

# Replace [hostname] with the value of HOST_NAME
RUN sed -i "s|\[hostname\]|${HOST_NAME}|g" /etc/nginx/nginx.conf

# HTTP, HTTPS
EXPOSE 80 443
