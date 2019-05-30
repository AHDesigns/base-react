# BASE
FROM node:8.11.1-alpine as base

MAINTAINER AHDesigns

ENV APP_HOME=/app
ENV PORT=3000

RUN mkdir $APP_HOME
WORKDIR $APP_HOME

COPY package.json $APP_HOME
COPY package-lock.json $APP_HOME

RUN npm install --only=production
RUN cp -R node_modules prod_modules
RUN npm install

# BUILD
FROM base as build
WORKDIR $APP_HOME

COPY . .

RUN npm run build

# PROD
FROM node:8.11.1-alpine

COPY --from=base /app/prod_modules ./node_modules
COPY --from=build /app/build ./build

# used to serve production
RUN npm install -g serve
CMD ["serve", "-s", "build"]
