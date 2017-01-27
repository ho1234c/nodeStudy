FROM node:4.7.2
MAINTAINER ho1234c <ho1234c@gmail.com>

# copy source
COPY . /usr/src/app
WORKDIR /usr/src/app

# set envirenment variable
RUN chmod 777 ./env.sh
ENTRYPOINT ["./env.sh"]
ENV NODE_ENV production

# open port
EXPOSE 8000

# start server
CMD ["npm", "start"]
