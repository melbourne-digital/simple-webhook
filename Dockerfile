FROM node:10
WORKDIR /usr/src/app
COPY site/package*.json ./
RUN npm install
COPY ./site .

# Add Git to the image
RUN apt-get update
RUN apt-get -y install git

EXPOSE 8080
CMD [ "node", "server.js" ]