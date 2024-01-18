FROM node:16-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

# production image
FROM node:16-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

RUN mkdir -p logs images

CMD ["npm", "start:prod"]