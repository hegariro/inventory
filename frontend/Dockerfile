FROM node:20.11.0 AS runner

WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY . .
ENV NODE_ENV=development
RUN npm run build

EXPOSE 9000

CMD [ "npm", "run", "dev" ]
