FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npx tsc

EXPOSE 8000

CMD ["npm", "start"]