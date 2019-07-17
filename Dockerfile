FROM node:10
WORKDIR /usr/src/app
COPY site/package*.json ./
RUN npm install
COPY ./site .

# Add Git to the image
RUN apt-get update && apt-get install -y \
    git \
 && rm -rf /var/lib/apt/lists/*

EXPOSE 8080
CMD [ "node", "server.js" ]
