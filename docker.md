> **WARNING:** 現在このbotは開発版です。このbotを使用して得た不利益について NamagomiNetworkは一切保証致しません

# docker

## docker Image

現在2つのImageがあります

- `namagomi-bot-docker`
    - このImageでは起動時に都度git上のデータを参照するため、イメージの更新をせずに最新版を使用可能です
    - その代わり、データ参照とnpmパッケージダウンロードを行うため起動に時間がかかります

- `namagomi-bot-full-docker`
    - このImageではImageの時点でbotデータを保持しているため起動が早く、常に同じバージョンを動かすことが可能です
    - その代わり、Imageのpullに時間がかかり、image自体のデータも大きなものとなっています

このイメージから、使用用途に合うものをご使用ください

## docker-compose

docker-compose.yaml は例としてこのようになります

### full-image

```yaml
version: '3'

services:
  namagomi-bot:
    image: ghcr.io/namagominetwork/namagomi-bot-full-docker:<version tag>
    volumes:
      - ./config.yaml:/config.yaml
```

### main-image

```yaml
version: '3'

services:
  namagomi-bot:
    image: ghcr.io/namagominetwork/namagomi-bot-docker:<version tag>
    volumes:
      - ./config.yaml:/config.yaml
```

## 現在のバージョンについて

下記のページより最新バージョンを確認してください

<br>

[full image](https://github.com/NamagomiNetwork/Namagomi-bot/pkgs/container/namagomi-bot-full-docker)
<br>

[main image](https://github.com/NamagomiNetwork/Namagomi-bot/pkgs/container/namagomi-bot-docker)
