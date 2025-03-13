# Usa la imagen oficial de LogStash
FROM docker.elastic.co/logstash/logstash:7.17.4

# Copia la configuración de LogStash
COPY conf/logstash.conf /usr/share/logstash/pipeline/logstash.conf

EXPOSE 5044




# timeout=30
# elapsed=0

# until mysqladmin ping -h mariadb -P 3306 --silent; do
# 	sleep 2
# 	elapsed=$((elapsed + 2))
#     if [ "$elapsed" -ge "$timeout" ]; then exit 1; fi
# done
