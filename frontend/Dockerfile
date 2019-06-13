# Builder stage, build React app
FROM node:12.3.1 AS builder

# Set working directory
WORKDIR /app

# Copy configuration files
COPY package.json /app/package.json
COPY tsconfig.json /app/tsconfig.json

# Install app dependencies
RUN yarn global add parcel-bundler
RUN yarn install --network-timeout 500000

# Caching
COPY . /app

# Build app
RUN yarn build

# Production stage, serve build through Nginx
FROM nginx:1.16.0
EXPOSE 80

# Copy configuration file
COPY nginx_conf /app/nginx_conf

# Copy build into Nginx folder
COPY --from=builder /app/dist/ /usr/share/nginx/html/dist/
COPY --from=builder /app/nginx_conf /etc/nginx/conf.d/default.conf