FROM node:14.17.5-alpine3.14 as builder

# Create app directory
WORKDIR /app

COPY yarn.lock ./
COPY package*.json ./
COPY prisma ./prisma/
COPY .docker ./.docker/

# Install app dependencies
RUN yarn install --production --frozen-lockfile

COPY . .

RUN yarn build


FROM node:14.17.5-alpine3.14

WORKDIR /app

RUN apk add --no-cache bash

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.docker ./.docker

RUN yarn install --production --frozen-lockfile

EXPOSE 4000
EXPOSE 5555

ENTRYPOINT [ ".docker/entrypoint.sh" ]
