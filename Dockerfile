FROM node:18 as build
WORKDIR /usr/app
COPY package*.json ./
RUN npm ci && npm cache clean --force
COPY . .
FROM node:18-alpine as main
WORKDIR /usr/app
COPY --from=build /usr/app /usr/app
CMD ["npm", "run", "start:dev"]
EXPOSE ${PORT}