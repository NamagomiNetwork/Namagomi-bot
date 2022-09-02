FROM ubuntu:20.04

RUN sed -i.bak -e "s%http://archive.ubuntu.com/ubuntu/%http://jp.archive.ubuntu.com/ubuntu/%g" /etc/apt/sources.list
RUN sed -i.bak -e "s%http://security.ubuntu.com/ubuntu/%http://jp.archive.ubuntu.com/ubuntu/%g" /etc/apt/sources.list
ENV TZ=Asia/Tokyo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt update && apt upgrade -y && apt install -y

# install nodejs
RUN apt install nodejs npm curl -y
RUN npm install -g n && n 16.6.0
RUN apt purge nodejs npm -y
RUN node -v

# install nodejs
RUN apt-get install -y software-properties-common \
    && add-apt-repository ppa:git-core/ppa \
    && apt-get update -y
RUN apt-get install -y git
RUN git clone https://github.com/NamagomiNetwork/Namagomi-bot.git

WORKDIR /Namagomi-bot
RUN npm i

CMD node index.js