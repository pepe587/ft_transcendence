#!/bin/bash
set -e

# Function to check if Kibana is ready
wait_for_kibana() {
  echo "Waiting for Kibana to start..."
  until curl -s http://localhost:5601/api/status > /dev/null; do
    sleep 5
  done
  sleep 10
  echo "Kibana is up and running!"
}

# Start Kibana in the background and wait
/usr/local/bin/kibana-docker &
KIBANA_PID=$!
wait_for_kibana

# Check if dashboards directory exists and contains files
if [ -d "/usr/share/kibana/dashboards" ] && [ "$(ls -A /usr/share/kibana/dashboards)" ]; then

  # Function to check if a specific dashboard exists
  dashboard_exists() {
    local dashboard_id="$1"
    local response
    
    response=$(curl -s -o /dev/null -w "%{http_code}" -XGET "http://localhost:5601/api/saved_objects/dashboard/$dashboard_id" \
      -H "kbn-xsrf: true" \
      -u ${ELASTICSEARCH_USERNAME}:${ELASTICSEARCH_PASSWORD})
    
    if [ "$response" == "200" ]; then return 0; else return 1; fi
  }
  
  # For each dashboard file
  for dashboard_file in /usr/share/kibana/dashboards/*.ndjson; do
    if [ -f "$dashboard_file" ]; then
     
      # Extract dashboard IDs from the file
      dashboard_ids=$(grep -o '"id":"[^"]*","type":"dashboard"' "$dashboard_file" | sed 's/"id":"//;s/","type":"dashboard"//')
      
      needs_import=true
      # If we found dashboard IDs, check if any of them already exist
      if [ ! -z "$dashboard_ids" ]; then
        for id in $dashboard_ids; do
          if dashboard_exists "$id"; then needs_import=false ; break; fi
        done
      fi
      
      if $needs_import; then
        echo "Importing dashboard: $dashboard_file"
		curl -X POST "http://localhost:5601/api/saved_objects/_import?overwrite=true" \
			-H "kbn-xsrf: true" \
			--form file=@${dashboard_file} \
			-u ${ELASTICSEARCH_USERNAME}:${ELASTICSEARCH_PASSWORD}
      fi
    fi
  done
fi

# Monitor processes
echo "Kibana is now running!"
wait $KIBANA_PID
