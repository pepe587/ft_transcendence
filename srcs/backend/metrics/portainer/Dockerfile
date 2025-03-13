# Debian image
FROM debian:bullseye

# Install curl
RUN apt-get update && apt-get install -y curl

# Clean up
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Portainer
RUN curl -L https://github.com/portainer/portainer/releases/download/2.21.4/portainer-2.21.4-linux-amd64.tar.gz -o portainer.tar.gz
RUN	tar -xzf portainer.tar.gz -C /usr/local/bin/ --strip-components=1 && rm portainer.tar.gz

# Create private key
ARG PORTAINER_PASSWORD
RUN echo "$PORTAINER_PASSWORD" > /private.key

# Execute Portainer
ENTRYPOINT ["portainer", "--data", "/data", "--admin-password-file", "/private.key"]

EXPOSE 9000
