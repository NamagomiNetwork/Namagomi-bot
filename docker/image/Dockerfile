FROM ubuntu:24.04

# ロケールとタイムゾーンの設定
ENV TZ=Asia/Tokyo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone \
    && apt update \
    && apt upgrade -y \
    && apt install -y --no-install-recommends \
    curl \
    software-properties-common \
    git \
    && sed -i.bak -e "s%http://archive.ubuntu.com/ubuntu/%http://jp.archive.ubuntu.com/ubuntu/%g" /etc/apt/sources.list \
    && sed -i.bak -e "s%http://security.ubuntu.com/ubuntu/%http://jp.archive.ubuntu.com/ubuntu/%g" /etc/apt/sources.list \
    && apt update \
    && apt clean

# Node.js 18.xx系最新のLTSをインストール
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt install -y nodejs \
    && npm install -g npm@latest \
    && apt clean \
    && rm -rf /var/lib/apt/lists/*
# Node.jsのバージョン確認
RUN node -v && npm -v

# Namagomi-botのリポジトリを/app配下に持ってくる
RUN git clone https://github.com/NamagomiNetwork/Namagomi-bot.git /app

# NOTE:事前にdocker/full-imageディレクトリ配下に`config.json`を配置する必要がある。
# Namagomi-botの設定ファイルをコンテナ内にコピー
COPY ./configs/config.json /app/configs/config.json

# 作業ディレクトリと依存関係のインストール
WORKDIR /app
RUN npm ci

# Namagomi-bot起動コマンドを実行
CMD ["node", "bot.js"]
