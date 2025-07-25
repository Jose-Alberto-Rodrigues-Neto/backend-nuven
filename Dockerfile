FROM node:18-alpine

WORKDIR /src

COPY package*.json ./
RUN npm install

COPY . .

COPY wait-for-postgres.sh .
RUN chmod +x wait-for-postgres.sh

EXPOSE 8080

CMD ["./wait-for-postgres.sh"]
