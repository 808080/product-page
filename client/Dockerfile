FROM node:18.2.0-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM nginx:1.23.3-alpine-slim AS deploy

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/dist .
EXPOSE 80