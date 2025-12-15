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
    && sed -i.bak -e "s%http://archive.ubuntu.com/ubuntu/%http://jp.archive.ubuntu.com/ubuntu/%g" /etc/apt/sources.list \
    && sed -i.bak -e "s%http://security.ubuntu.com/ubuntu/%http://jp.archive.ubuntu.com/ubuntu/%g" /etc/apt/sources.list \
    && apt update \
    && apt clean \
    && rm -rf /var/lib/apt/lists/*

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

# アプリケーションファイルをコピー
# 1. 作業ディレクトリを設定
WORKDIR /app

# 2. 依存関係ファイルのみをコピーし、npm ciを実行（キャッシュ効率を最大化）
#    ※ package.jsonがリポジトリルートにあることを前提としています
COPY package.json package-lock.json ./
RUN npm ci

# 3. 依存関係のインストール後、残りのアプリケーションファイル全体をコピー
#    （package.json, package-lock.json は上書きされますが、問題ありません）
COPY . .

# 4. config.json の処理を明確化
#    NOTE: config.json がリポジトリに含まれておらず、ビルドコンテキストの /configs ディレクトリに手動で配置されている場合、以下の行のコメントアウトを外してください。
# COPY ./configs/config.json ./configs/config.json

# Namagomi-bot起動コマンドを実行し、プロセス起動
CMD ["node", "bot.js"]