FROM node:20-alpine AS builder

WORKDIR /app

COPY ./src /app/src
COPY ./package.json /app/package.json
COPY ./tsconfig.json /app/tsconfig.json

RUN npm install

RUN npm run build

FROM node:20-alpine AS dev

ENV NODE_ENV dev

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/*.json ./*.json

CMD ["node", "dist/src/main"]