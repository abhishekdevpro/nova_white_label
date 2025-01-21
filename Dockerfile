# FROM node:20.3.0-alpine AS build

# WORKDIR /app

# COPY ./package.json ./
# RUN npm i

# COPY . .
# RUN npm run build


# # production environment
# FROM nginx:stable-alpine

# COPY --from=build /app/build /usr/share/nginx/www
# # COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# # Set environment variables (adjust as needed)
# ENV NODE_ENV=production
# ENV PORT=3000

# EXPOSE 3000

# CMD ["nginx", "-g"," daemon off;"]


# Stage 1: Build the React application
FROM node:20.3.0-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./ 
RUN npm install

# Copy all files to the container
COPY . .

# Build the React application for production
RUN npm run build

# Stage 2: Serve the React application using Nginx
FROM nginx:stable-alpine

# Copy built React application from the build stage to Nginx's web root
COPY --from=build /app/build /usr/share/nginx/html

# Remove default Nginx configuration and replace it with a custom configuration (optional)
# Uncomment if you have a custom nginx.conf for SPA routing
# COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 3000 for the application
EXPOSE 3000

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
