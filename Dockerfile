FROM node:14-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:alpine
COPY --from=build /app/dist/front-colegio-catolico /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
