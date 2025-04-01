#!/bin/bash

if [ $# -eq 0 ]; then
    echo "Usage:  $0 servicio1 [servicio2 servicio3 ...]"
    exit 1
fi

cd srcs

for service in "$@"; do
    docker-compose down "$service"
    docker-compose build "$service"
done

cd ..
