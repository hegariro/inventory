FROM node:20.11.0 AS runner

WORKDIR /app
COPY ./package*.json ./
RUN npm install -g nodemon && npm install
COPY . .

ENV NODE_ENV=production
EXPOSE 3000

CMD [ "npm", "run", "start" ]