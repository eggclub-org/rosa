# Author: Cuong Nguyen
#
# Build: docker build -t cuongnb14/rosa:0.1 .
# Run: docker run -d -p 8080:8080 --name rosa cuongnb14/rosa:0.1 .
#

FROM ubuntu:16.04
MAINTAINER Cuong Nguyen "cuongnb14@gmail.com"

RUN apt-get update -qq

RUN DEBIAN_FRONTEND=noninteractive apt-get install -y nodejs npm

RUN locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install

CMD ["nodejs", "index.js"]

