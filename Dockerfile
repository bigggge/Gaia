FROM node:8.11.2
RUN apt-get clean && apt-get update
RUN apt-get install -y nginx
WORKDIR /app
COPY . /app/
EXPOSE 80
RUN npm install --registry=https://registry.npm.taobao.org \
&& npm run build \
&& cp -r dist/* /var/www/html \
&& rm -rf /app
CMD ["nginx","-g","daemon off;"]