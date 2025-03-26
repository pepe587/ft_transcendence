# Usa la imagen oficial de Nginx
FROM nginx:latest

# Instala OpenSSL y wget
RUN apt-get update && apt-get install -y openssl wget && rm -rf /var/lib/apt/lists/*

# Descarga y extrae el nginx-prometheus-exporter
RUN wget https://github.com/nginxinc/nginx-prometheus-exporter/releases/download/v1.3.0/nginx-prometheus-exporter_1.3.0_linux_amd64.tar.gz \
    -O /tmp/nginx-prometheus-exporter.tar.gz && \
    tar -zxvf /tmp/nginx-prometheus-exporter.tar.gz -C /tmp && \
    mv /tmp/nginx-prometheus-exporter /usr/local/bin/nginx-prometheus-exporter && \
    rm /tmp/nginx-prometheus-exporter.tar.gz

RUN chmod +x /usr/local/bin/nginx-prometheus-exporter

# Crea un certificado SSL autosignado
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/ssl/private/server.key \
    -out /etc/ssl/certs/server.crt \
    -subj "/C=ES/ST=Andalucia/L=Malaga/O=42 Malaga/OU=Formacion/CN=localhost"

# Copia el archivo de configuración personalizado
COPY conf/nginx.conf /etc/nginx/nginx.conf
COPY conf/configs /etc/nginx/configs

# Ejecuta Nginx y el exportador en segundo plano
ENTRYPOINT ["sh", "-c", "/usr/local/bin/nginx-prometheus-exporter -nginx.scrape-uri http://localhost/metrics & nginx -g 'daemon off;'"]

# HTTP, HTTPS & Exportador
EXPOSE 80 443 9113
