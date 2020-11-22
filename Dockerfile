FROM node

WORKDIR /code

COPY package.json /code

RUN yarn

COPY . /code

EXPOSE 3000

CMD yarn start