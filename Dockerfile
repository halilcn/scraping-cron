FROM node:18.11.0-alpine
WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
ENV MONGO_DB_URI=$MONGO_DB_URI
CMD ["npm","run","start"]
