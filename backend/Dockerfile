FROM node:16-alpine as deps

COPY package*,json ./

RUN npm install

COPY . .

EXPOSE 3005

CMD ["npm", "run", "start"]