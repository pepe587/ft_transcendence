FROM node:20-alpine AS builder

WORKDIR /app

# Install production dependencies only
COPY package*.json ./
RUN npm install --omit=dev

COPY . .

# Production stage
FROM node:20-alpine

WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 nodejs && adduser -u 1001 -G nodejs -s /bin/bash -D nodejs

# Copy only necessary files from builder stage
COPY --from=builder --chown=nodejs:nodejs /app/package*.json ./
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/src ./src

# Switch to non-root
USER nodejs

EXPOSE 3000

CMD ["node", "src/app.js"]
