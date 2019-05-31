# Base image
FROM node:12.3.1 AS builder

# Set working directory
WORKDIR /app

# Copy configuration files
COPY package.json /app/package.json
COPY tsconfig.json /app/tsconfig.json

# Install app dependencies
RUN yarn global add parcel-bundler
RUN yarn install --network-timeout 500000

# Caching - uncomment for production
# COPY . /app

# TODO
# FROM nginx:1.16.0
