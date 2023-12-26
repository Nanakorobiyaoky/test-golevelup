FROM node:alpine As development

COPY --from=ghcr.io/ufoscout/docker-compose-wait:latest /wait /wait

WORKDIR /usr/src/app

RUN npm install -g @nestjs/cli

COPY . .