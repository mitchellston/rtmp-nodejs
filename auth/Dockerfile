FROM node:12
WORKDIR /usr/src/app/auth
COPY package*.json ./
RUN npm install
COPY server.ts ./
CMD [ "npm", "start" ]