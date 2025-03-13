
# Variables
GR = \033[0;32m
NC = \033[0m
CU = \033[1A
CL = \r%50s\r
DC = srcs/docker-compose.yml

all: up

# Create containers
up:
	@docker compose -f $(DC) up -d || exit 1
	@printf "\n"

# Removes containers
down:
	@docker compose -f $(DC) down || exit 1
	@printf "\n"

# Restarts containers
restart:
	@docker compose -f $(DC) down || exit 1
	@docker compose -f $(DC) up -d || exit 1
	@printf "\n"

# Builds containers
build:
	@docker compose -f $(DC) down || exit 1
	@docker compose -f $(DC) build || exit 1
	@printf "\n ✔ Containers\t\t\t$(GR)Built$(NC)\n\n"

# Rebuilds containers
rebuild:
	@docker compose -f $(DC) down || exit 1
	@docker compose -f $(DC) build --no-cache || exit 1
	@printf "\n ✔ Containers\t\t\t$(GR)Rebuilt$(NC)\n\n"

# Removes images
clean:
	@docker compose -f $(DC) down || exit 1
	@printf "\nplease wait...\n"
	@$(MAKE) -s _remove
	@printf "$(CU)$(CL) ✔ Images\t\t\t$(GR)Removed$(NC)\n"
	@printf " ✔ Network\t\t\t$(GR)Removed$(NC)\n\n"

# Removes volumes
vclean:
	@docker compose -f $(DC) down || exit 1
	@printf "\nplease wait...\n"
	@docker volume rm srcs_db-data > /dev/null 2>&1 || true
	@docker volume rm srcs_db_logs > /dev/null 2>&1 || true
	@printf "$(CU)$(CL) ✔ Volumes\t\t\t$(GR)Removed$(NC)\n\n"

# Removes images, volumes and network
fclean:
	@docker compose -f $(DC) down || exit 1
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
	@docker compose -f $(DC) down || exit 1
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

.PHONY: all up down restart build rebuild clean vclean fclean fcclean _remove

