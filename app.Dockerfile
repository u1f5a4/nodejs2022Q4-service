FROM node:18 as build-stage
WORKDIR /usr/app
COPY package*.json ./
RUN npm install

FROM node:18-alpine as run-stage
WORKDIR /usr/app
COPY . .
COPY --from=build-stage /usr/app/ .
EXPOSE ${PORT}
CMD npm run start:dev