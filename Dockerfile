# Build Environment: Node + Playwright
FROM node:latest
FROM mcr.microsoft.com/playwright:v1.50.0-noble

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
RUN npx playwright install-deps
RUN npx playwright install
# Build TS into JS to run via Node
# Run Node index.js file
CMD [ "npm", "start" ]
