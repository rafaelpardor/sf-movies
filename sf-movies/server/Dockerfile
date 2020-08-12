FROM node:12

WORKDIR /usr/bin/app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm","start"]
