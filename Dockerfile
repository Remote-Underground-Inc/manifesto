FROM node:12.18.3-alpine AS builder

WORKDIR /app

COPY package.json ./

RUN apk add --no-cache git

RUN npm install

COPY . ./

RUN npm run build

FROM nginx:1.18.0-alpine

COPY --from=builder /app/public /usr/share/nginx/html