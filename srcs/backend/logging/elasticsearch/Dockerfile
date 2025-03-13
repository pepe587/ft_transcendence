# Official image of ElasticSearch
FROM docker.elastic.co/elasticsearch/elasticsearch:7.17.4


# Install OpenSSL, wget & Exporter
RUN apt-get update && apt-get install -y wget
RUN wget https://github.com/prometheus-community/elasticsearch_exporter/releases/download/v1.8.0/elasticsearch_exporter-1.8.0.linux-amd64.tar.gz \
-O /tmp/elasticsearch-exporter.tar.gz && \
tar -zxvf /tmp/elasticsearch-exporter.tar.gz -C /tmp && \
mv /tmp/elasticsearch_exporter-1.8.0.linux-amd64/elasticsearch_exporter /usr/local/bin/elasticsearch-exporter && \
rm -rf /tmp/elasticsearch-exporter.tar.gz /tmp/elasticsearch_exporter-1.8.0.linux-amd64
RUN chmod +x /usr/local/bin/elasticsearch-exporter

# Clean up
RUN apt-get clean && rm -rf /var/lib/apt/lists/*


# Execute ElasticSearch & Exporter
CMD ["sh", "-c", "/usr/local/bin/elasticsearch-exporter --es.uri=http://localhost:9200 & /usr/local/bin/docker-entrypoint.sh eswrapper"]


# ElasticSearch & Exporter
EXPOSE 9200 9114
