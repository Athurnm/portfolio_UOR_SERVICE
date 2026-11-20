# Stage 1: Build Portfolio (/) + Tools Lab (/tools/)
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY tools/package*.json ./tools/
RUN npm ci
COPY . .
RUN npm run build:all

# Stage 2: Serve with Nginx (SPA fallbacks for /tools/ and /)
FROM nginx:1.27-alpine-slim
RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
RUN printf 'server {\n\
  listen 8080;\n\
  server_name _;\n\
  root /usr/share/nginx/html;\n\
  index index.html;\n\
  absolute_redirect off;\n\
  port_in_redirect off;\n\
  location = /tools {\n\
    return 301 /tools/;\n\
  }\n\
  location /tools/ {\n\
    try_files $uri $uri/ /tools/index.html;\n\
  }\n\
  location / {\n\
    try_files $uri $uri/ /index.html;\n\
  }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/ >/dev/null || exit 1
CMD ["nginx", "-g", "daemon off;"]
