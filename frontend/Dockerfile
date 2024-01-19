FROM node:20.11.0 AS runner

WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY . .
ENV NODE_ENV=production
RUN npm run build

EXPOSE 9000

CMD [ "npm", "run", "preview" ]
