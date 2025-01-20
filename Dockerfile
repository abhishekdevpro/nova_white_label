# # Build environment
# FROM node:20.3.0-alpine AS build

# WORKDIR /app

# # Install dependencies
# COPY ./package.json ./package-lock.json* ./
# RUN npm install

# # Copy source code and build the application
# COPY . ./
# RUN npm run build

# # Production environment
# FROM nginx:1.25.1-alpine AS production

# WORKDIR /usr/share/nginx/html

# # Copy the React build output to the Nginx HTML directory
# COPY --from=build /app/build .

# # Expose the port Nginx will use
# EXPOSE 80

# # Health check (optional)
# HEALTHCHECK CMD curl --fail http://localhost:80/ || exit 1

# # Start Nginx server
# CMD ["nginx", "-g", "daemon off;"]

# docker build . -t abhishekdevpro/novawl_fe:1.0
# docker push abhishekdevpro/novawl_fe:1.0


# build environment
# FROM node:20-alpine3.17 AS build
FROM node:20.3.0-alpine AS build

WORKDIR /app

COPY ./package.json ./
RUN npm i

COPY . .
RUN npm run build


# production environment
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/www
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g"," daemon off;"]