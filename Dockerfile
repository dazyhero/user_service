FROM node:12

WORKDIR /opt/app

COPY package*.json ./

RUN npm i --quiet

COPY . .

CMD npm run dev
