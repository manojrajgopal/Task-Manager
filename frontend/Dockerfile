# Build stage
FROM node:18 AS build

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# Serve with Nginx
FROM nginx:alpine

# Copy built React files to Nginx html folder
COPY --from=build /app/build /usr/share/nginx/html

# (Optional) Copy custom Nginx config
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (Nginx default)
EXPOSE 80

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]
