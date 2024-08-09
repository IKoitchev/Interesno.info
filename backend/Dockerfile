FROM node:18.18.0-alpine

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3005

# ENV HOST=host.docker.internal

CMD ["npm", "run", "start"]