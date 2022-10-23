FROM node:16.14.0 as base


FROM base as development
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE $PORT
CMD [ "npm","run","dev" ]


FROM base as production
WORKDIR /app
COPY package.json .
RUN npm install --only=production
COPY . .
EXPOSE $PORT
CMD [ "npm","start" ]