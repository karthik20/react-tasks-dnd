FROM alpine

LABEL maintainer="aceventura18@gmail.com"

RUN apk add --update nodejs yarn

COPY . /src

WORKDIR /src

RUN yarn install

EXPOSE 3000

CMD [ "yarn", "start" ]

