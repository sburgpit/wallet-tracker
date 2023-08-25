FROM node:18.8-alpine as base

FROM base as builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --ignore-engines --verbose

COPY . .

RUN yarn build

FROM base as runtime

ENV PAYLOAD_CONFIG_PATH=/app/dist/payload.config.js
ENV NODE_ENV=production

WORKDIR /app
COPY package.json yarn.lock ./

RUN yarn install --production --ignore-engines --verbose
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/build ./build

EXPOSE 3000

CMD ["node", "dist/server.js"]
