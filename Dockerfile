# build environment
FROM node:20-alpine3.17 as build

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

CMD ["nginx", "-g", "daemon off;"]