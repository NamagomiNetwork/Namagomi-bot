# configファイルの作成

このセクションでは、configの作成を行います

## sampleConfigからのコピー

- `configs` ディレクトリにある `sample_config.json` を `config.json` に名称を変更します

## configファイルの編集

### カテゴリー: bot

- `token`
    - botのTOKENを指定します
- `prefix`
    - 初期のprefixを設定します
    - これらはユーザーごとに変更可能です
- `owner`
    - botのownerを指定します
    - eval(コード実行) などの管理コマンドが実行可能になります

### カテゴリー: mongodb

- `url`
    - mongodbの接続URLを指定します
    - 例: `mongodb+srv://user:pass@hogehoge_namagmoi_bot_sample.dhpsa.mongodb.net/namagomibot?retryWrites=true&w=majority`

### カテゴリー: debug

- `enable`
    - `true`もしくは、`false` を指定してください
    - `true`に設定すると、詳細なログ出力,コマンド実行エラー時に詳細を表示します

### カテゴリー: command_settings

この項目では一部コマンドの無効化を行えます。

- trueで有効,falseで無効化します

### カテゴリー: seichi_vote_notification

この項目では、整地鯖投票通知を行えます

- `channel`
    - 投票通知を送信するチャンネルIDを設定します
- `role`
    - メンションを行うユーザーIDもしくは、ロールを設定します

### カテゴリー: その他

- `syslog`
    - botの一部ログをDiscordに送信します
    - チャンネルIDを指定してください