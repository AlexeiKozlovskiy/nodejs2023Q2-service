FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN npm ci && npm cache clean --force
COPY . .
FROM node:18-alpine as production
WORKDIR /app
COPY --from=build /app /app
CMD ["npm", "run", "start:dev"]
EXPOSE ${PORT}