# Namagomi-bot

生ゴミ鯖用に色々便利機能をつけた Discord Bot

## この Bot のコマンド一覧をみたい場合

[wiki](https://github.com/NamagomiNetwork/Namagomi-bot/wiki) をごらんください。<br>
コマンドの一覧,使用方法をまとめています

## 前提要件

-   MongoDB を使用できる環境
-   Node.js v16.6.0 以上

## bot を起動する手順

### リポジトリから最新の bot データを取得する

```shell
git clone https://github.com/NamagomiNetwork/Namagomi-bot.git
```

### config を作成する

[config docs](./config.md) を参考に `config.json`を作成してください。

### 必要なモジュールをインストールする

`package.json`に明示される全てのパッケージをインストールします。

```shell
npm i
```

※`package.json`があるディレクトリで実行してください。

### bot を起動する

`bot.js`を直接叩くか

```shell
node bot.js
```

もしくは、`npm start`により起動できます。

```shell
npm start
```
