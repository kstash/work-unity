FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json tsconfig.json ./
COPY src ./src

RUN npm install
RUN npm run build

RUN mkdir -p logs images

FROM builder AS dev

ENV NODE_ENV dev

CMD ["npm", "run", "start:dev"]