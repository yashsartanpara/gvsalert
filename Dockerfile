# Build Environment: Node + Playwright
FROM node:latest
FROM mcr.microsoft.com/playwright:focal

# Env
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# Export port 3000 for Node
EXPOSE 3000

# Copy all app files into Docker Work directory
COPY package*.json /app/
COPY py.spec.js /app/

# Install Deps
RUN npm install

# Build TS into JS to run via Node
RUN npm run build

# Run Node index.js file
CMD [ "npm", "start" ]
