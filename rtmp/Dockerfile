FROM node:12
WORKDIR /usr/src/app/rtmp
COPY package*.json ./
RUN npm install
COPY server.ts ./
CMD [ "npm", "start" ]