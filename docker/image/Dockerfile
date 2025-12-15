# ベースイメージの設定
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
    python3 \
    build-essential \
    && sed -i.bak -e "s%http://archive.ubuntu.com/ubuntu/%http://jp.archive.ubuntu.com/ubuntu/%g" /etc/apt/sources.list \
    && sed -i.bak -e "s%http://security.ubuntu.com/ubuntu/%http://jp.archive.ubuntu.com/ubuntu/%g" /etc/apt/sources.list \
    && apt update \
    && apt clean

# Namagomi-botの動作要件を満たすため、Node.js 22.xx系最新のLTSをインストール
RUN curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh \
    && bash nodesource_setup.sh \
    && apt update \
    && apt install -y nodejs \
    && npm install -g npm@latest \
    && apt clean \
    && rm -f nodesource_setup.sh \
    && rm -rf /var/lib/apt/lists/*

# Node.jsのバージョン確認
RUN node -v && npm -v

# アプリケーションのリポジトリ全体をコンテナの /app ディレクトリにコピー
COPY . /app

# NOTE:もしconfig.jsonをリポジトリルートに含めていない場合、ここでコピーする
# COPY ./configs/config.json /app/configs/config.json

# 作業ディレクトリを設定し、依存関係のインストール
WORKDIR /app
RUN npm ci

# Namagomi-bot起動コマンドを実行し、プロセス起動
CMD ["node", "bot.js"]