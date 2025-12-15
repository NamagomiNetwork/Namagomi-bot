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
    libsqlite3-dev \
    pkg-config \
    gcc \
    g++ \
    libtool \
    automake \
    && sed -i.bak -e "s%http://archive.ubuntu.com/ubuntu/%http://jp.archive.ubuntu.com/ubuntu/%g" /etc/apt/sources.list \
    && sed -i.bak -e "s%http://security.ubuntu.com/ubuntu/%http://jp.archive.ubuntu.com/ubuntu/%g" /etc/apt/sources.list \
    && apt update \
    && apt clean \
    && rm -rf /var/lib/apt/lists/*

# Namagomi-botの動作要件を満たすため、Node.js 20.xx系LTSをインストール
RUN curl -fsSL https://deb.nodesource.com/setup_20.x -o nodesource_setup.sh \
    && bash nodesource_setup.sh \
    && apt update \
    && apt install -y nodejs \
    && npm install -g npm@latest \
    && apt clean \
    && rm -f nodesource_setup.sh \
    && rm -rf /var/lib/apt/lists/*

# Node.jsのバージョン確認
RUN node -v && npm -v

# アプリケーションファイルをコピー
# 1. 作業ディレクトリを設定
WORKDIR /app

RUN mkdir -p /configs

# 2. 依存関係ファイルのみをコピーし、npm ciを実行（キャッシュ効率を最大化）
COPY package.json package-lock.json ./
RUN npm ci

# 3. 依存関係のインストール後、残りのアプリケーションファイル全体をコピー
COPY . .

# Namagomi-bot起動コマンドを実行し、プロセス起動
CMD ["node", "bot.js"]