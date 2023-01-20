FROM node:14-alpine

ADD . /max-min
WORKDIR /max-min

COPY package*.json ./max-min/
COPY nodemon.json ./max-min/
RUN npm install

EXPOSE 15500
CMD [ "npm", "run", "dev" ]
