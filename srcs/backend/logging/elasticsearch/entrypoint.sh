#!/bin/bash
set -e

# Set password for default 'elastic' user (will be disabled later)
export ELASTIC_PASSWORD=${ELASTICSEARCH_PASSWORD}

# Function to check if ElasticSearch is ready
wait_for_elasticsearch() {
  echo "Waiting for ElasticSearch to start..."
  until curl -s http://localhost:9200 > /dev/null; do
    sleep 5
  done
  echo "ElasticSearch is up and running!"
}

# Start ElasticSearch in the background and wait
/usr/local/bin/docker-entrypoint.sh eswrapper & ES_PID=$!
wait_for_elasticsearch

# Create new admin user if it doesn't exist
if ! bin/elasticsearch-users list | grep -q $ELASTICSEARCH_USERNAME; then
  echo -e "Creating new admin user...\n"
  # First create the user with the command line tool
  bin/elasticsearch-users useradd $ELASTICSEARCH_USERNAME -p $ELASTICSEARCH_PASSWORD -r superuser
  
  # Add the user properly via API to ensure it appears in the UI
    curl -X POST "http://localhost:9200/_security/user/$ELASTICSEARCH_USERNAME" \
    -H 'Content-Type: application/json' \
    -u "elastic:$ELASTIC_PASSWORD" \
    -d '{
      "password": "'"$ELASTICSEARCH_PASSWORD"'",
      "roles": ["superuser"],
      "full_name": "Administrator"
    }' || echo -e "\n\nFailed to register user via API\n"
  
  # Now disable the elastic user via API - without a request body
  echo -e "\n\nDisabling default elastic user via API...\n"
  curl -X PUT "http://localhost:9200/_security/user/elastic/_disable" \
    -H 'Content-Type: application/json' \
    -u "$ELASTICSEARCH_USERNAME:$ELASTICSEARCH_PASSWORD" || echo "Failed to disable elastic user"
    
  echo -e "\n\nUser management completed successfully!\n"
fi

# Start the ElasticSearch exporter
echo "Starting ElasticSearch exporter..."
/usr/local/bin/elasticsearch-exporter --es.uri=http://$ELASTICSEARCH_USERNAME:$ELASTICSEARCH_PASSWORD@localhost:9200 &
EXPORTER_PID=$!

# Monitor processes
echo "ElasticSearch is now running!"
wait $ES_PID
