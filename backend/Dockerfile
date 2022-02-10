FROM node:10

WORKDIR /app

COPY package*.json ./

RUN npm install --silent

ENV TZ=Asia/Seoul

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY . .

CMD [ "npm", "start" ]

EXPOSE 3001