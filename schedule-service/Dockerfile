FROM node:latest as base

WORKDIR /ExamApp
COPY package*.json ./

RUN npm install
COPY . .

FROM base as production
RUN npm run build