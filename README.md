# Namagomi-bot

生ゴミ鯖用に色々便利機能をつけたBot

## このBotのコマンド一覧をみたい場合

[wiki](https://github.com/NamagomiNetwork/Namagomi-bot/wiki) をごらんください。<br>
コマンドの一覧,使用方法をまとめています

## 前提要件

- mongodbを使用できる環境
- nodejs v16.6.0以上

## botを起動する

### gitから最新のbotデータを取得する

```shell
git clone https://github.com/NamagomiNetwork/Namagomi-bot.git
```
### configを作成する

[config docs](./config.md) を参考にconfigを作成してください

### モジュールをインストールします

```shell
npm i
```

### 起動します

```
node bot.js
```