FROM node:12.18.2
WORKDIR /backend

COPY package.json /home/app/

COPY . .

CMD yarn && yarn typeorm migration:run && yarn dev:server
