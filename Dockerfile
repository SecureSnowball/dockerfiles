FROM node:14
RUN npm install -g nodemon
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]