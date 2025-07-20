FROM node:18-alpine

WORKDIR /src

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "dev" ]