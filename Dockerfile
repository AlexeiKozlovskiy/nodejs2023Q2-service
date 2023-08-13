FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN npm ci && npm cache clean --force
COPY . .
FROM node:18-alpine as run
WORKDIR /app
COPY --from=build /app ./
EXPOSE ${PORT}
CMD npx prisma migrate dev && npm run start:dev
