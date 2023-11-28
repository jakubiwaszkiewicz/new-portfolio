# Stage 1: Build the React app
FROM node:latest AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if applicable)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the app source code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the React app using a lightweight server
FROM nginx:alpine

# Copy the built app from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Remove default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom Nginx configuration (if needed)
COPY nginx-custom.conf /etc/nginx/conf.d/

# Expose the port Nginx will listen on
EXPOSE 3000

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
