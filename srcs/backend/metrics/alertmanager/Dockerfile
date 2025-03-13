# Usa la imagen oficial de AlertManager
FROM prom/alertmanager

# Copia la configuración de Prometheus
COPY conf/alertmanager.yml /etc/alertmanager/alertmanager.yml

# Establece el punto de entrada
ENTRYPOINT ["/bin/alertmanager", "--config.file=/etc/alertmanager/alertmanager.yml"]

EXPOSE 9093
