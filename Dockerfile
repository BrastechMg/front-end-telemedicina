FROM node:16.20.2

WORKDIR /usr/src/app
COPY package.json . /usr/src/app/ 
RUN npm install
COPY . /usr/src/app

RUN npm install -g @angular/cli@16.1.3

COPY . /usr/src/app

<<<<<<< HEAD
EXPOSE 4201
=======
EXPOSE 4201 
>>>>>>> main

CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4201"]
