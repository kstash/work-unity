FROM node:18-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

# production image
FROM builder AS latest

WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

RUN mkdir -p logs images

CMD ["npm", "run", "start:prod"]

FROM builder AS dev

WORKDIR /app

ENV NODE_ENV development

COPY --from=builder . .

RUN mkdir -p logs images

CMD ["npm", "run", "start:dev"]