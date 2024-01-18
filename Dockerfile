FROM --platform=arm64/v8 node:16-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install --only=production && npm run build

# production image
FROM --platform=arm64/v8 node:16-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app .

CMD ["npm", "start:prod"]