
# Variables
GR = \033[0;32m
NC = \033[0m
CU = \033[1A
CL = \r%50s\r
DC = srcs/docker-compose.yml
DOCKER_COMPOSE = UID=$(shell id -u) docker compose -f

all: up

# Create containers
up:
	@$(DOCKER_COMPOSE) $(DC) up -d || exit 1
	@printf "\n"

# Removes containers
down:
	@$(DOCKER_COMPOSE) $(DC) down || exit 1
	@printf "\n"

# Restarts containers
restart:
	@$(DOCKER_COMPOSE) $(DC) down || exit 1
	@$(DOCKER_COMPOSE) $(DC) up -d || exit 1
	@printf "\n"

# Builds containers
build:
	@$(DOCKER_COMPOSE) $(DC) down || exit 1
	@$(DOCKER_COMPOSE) $(DC) build || exit 1
	@printf "\n ✔ Containers\t\t\t$(GR)Built$(NC)\n\n"

# Rebuilds containers
rebuild:
	@$(DOCKER_COMPOSE) $(DC) down || exit 1
	@$(DOCKER_COMPOSE) $(DC) build --no-cache || exit 1
	@printf "\n ✔ Containers\t\t\t$(GR)Rebuilt$(NC)\n\n"

# Removes images
clean:
	@$(DOCKER_COMPOSE) $(DC) down || exit 1
	@printf "\nplease wait...\n"
	@$(MAKE) -s _remove
	@printf "$(CU)$(CL) ✔ Images\t\t\t$(GR)Removed$(NC)\n"
	@printf " ✔ Network\t\t\t$(GR)Removed$(NC)\n\n"

# Removes volumes
vclean:
	@$(DOCKER_COMPOSE) $(DC) down || exit 1
	@printf "\nplease wait...\n"
	@docker volume rm srcs_db-data > /dev/null 2>&1 || true
	@docker volume rm srcs_db_logs > /dev/null 2>&1 || true
	@printf "$(CU)$(CL) ✔ Volumes\t\t\t$(GR)Removed$(NC)\n\n"

# Removes images, volumes and network
fclean:
	@$(DOCKER_COMPOSE) $(DC) down || exit 1
	@printf "\nplease wait...\n"
	@$(MAKE) -s _remove
	@docker volume rm srcs_db-data > /dev/null 2>&1 || true
	@docker volume rm srcs_db_logs > /dev/null 2>&1 || true
	@docker network rm pong-net > /dev/null 2>&1 || true
	@printf "$(CU)$(CL) ✔ Images\t\t\t$(GR)Removed$(NC)\n"
	@printf " ✔ Volumes\t\t\t$(GR)Removed$(NC)\n"
	@printf " ✔ Network\t\t\t$(GR)Removed$(NC)\n\n"

# Removes images, volumes, network and cache
fcclean:
	@$(DOCKER_COMPOSE) $(DC) down || exit 1
	@printf "\nplease wait...\n"
	@$(MAKE) -s _remove
	@docker volume rm srcs_db-data > /dev/null 2>&1 || true
	@docker volume rm srcs_db_logs > /dev/null 2>&1 || true
	@docker network rm pong-net > /dev/null 2>&1 || true
	@docker builder prune -f > /dev/null 2>&1 || true
	@printf "$(CU)$(CL) ✔ Images\t\t\t$(GR)Removed$(NC)\n"
	@printf " ✔ Volumes\t\t\t$(GR)Removed$(NC)\n"
	@printf " ✔ Network\t\t\t$(GR)Removed$(NC)\n"
	@printf " ✔ Cache\t\t\t$(GR)Removed$(NC)\n\n"

# Remove images (private rule)
_remove:
	@docker rmi srcs-nginx > /dev/null 2>&1 || true
	@docker rmi srcs-postgre > /dev/null 2>&1 || true
	@docker rmi srcs-elasticsearch > /dev/null 2>&1 || true
	@docker rmi srcs-logstash > /dev/null 2>&1 || true
	@docker rmi srcs-kibana > /dev/null 2>&1 || true
	@docker rmi srcs-alertmanager > /dev/null 2>&1 || true
	@docker rmi srcs-grafana > /dev/null 2>&1 || true
	@docker rmi srcs-prometheus > /dev/null 2>&1 || true
	@docker rmi srcs-service1 > /dev/null 2>&1 || true

.PHONY: all up down restart build rebuild clean vclean fclean fcclean _remove nuke

