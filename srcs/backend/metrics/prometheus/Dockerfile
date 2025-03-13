# Usa la imagen oficial de Prometheus
FROM prom/prometheus:latest

# Copia la configuración de Prometheus
COPY conf/prometheus.yml /etc/prometheus/prometheus.yml
COPY conf/rules/*.yaml /etc/prometheus/

# Establece el punto de entrada con la configuración de la URL externa
ENTRYPOINT ["/bin/prometheus", "--config.file=/etc/prometheus/prometheus.yml", "--storage.tsdb.path=/prometheus", "--storage.tsdb.retention.time=30d", "--web.listen-address=:9090", "--web.external-url=https://localhost/prometheus/"]

EXPOSE 9090
