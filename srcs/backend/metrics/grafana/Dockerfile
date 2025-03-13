# Usa la imagen oficial de Grafana
FROM grafana/grafana

# Crea los directorios necesarios
RUN mkdir -p /etc/grafana/provisioning/datasources /etc/grafana/provisioning/dashboards

# Copia los archivos
COPY conf/prometheus.yml /etc/grafana/provisioning/datasources/
COPY conf/dashboards/dashboard.yml /etc/grafana/provisioning/dashboards/
COPY conf/dashboards/*.json /etc/grafana/provisioning/dashboards/

EXPOSE 3000
