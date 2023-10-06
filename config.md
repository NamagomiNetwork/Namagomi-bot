# config ファイルの作成

このセクションでは、config の作成方法について記載します

## sample_config からのコピー

- `configs` ディレクトリにある `sample_config.json` を `config.json` にファイル名称を変更します

## config ファイルの編集

### カテゴリー: bot

- `token`
  - Bot の TOKEN を指定します
- `prefix`
  - prefix の初期値を設定します
  - `set-prefix`コマンドによりユーザ単位で変更可能です
- `owner`
  - Bot の owner を指定します
  - `eval`(コード実行) などの管理コマンドが実行可能になります

### カテゴリー: mongodb

- `url`
  - MongoDB の接続 URL を指定します
  - 例: `mongodb+srv://user:pass@hogehoge_namagmoi_bot_sample.dhpsa.mongodb.net/namagomibot?retryWrites=true&w=majority`

### カテゴリー: debug

- `enable`
  - `true`もしくは、`false` を指定してください
  - `true`に設定すると、詳細なログ出力,コマンド実行エラー時に詳細を表示します

### カテゴリー: syslog

- `syslog`
  - Bot の一部ログを Discord に送信します
  - ログを送信するチャンネル ID を指定します

### カテゴリー: command_settings

このカテゴリーでは一部コマンドの無効化が可能です

- `true` でコマンドの有効化、`false`でコマンドの無効化を設定します
- 対象コマンドは以下となります
  - eval
  - shell
  - shutdown

### カテゴリー: seichi_vote_notification

このカテゴリーでは、整地鯖投票通知に関する設定が可能です

- `channel`
  - 投票通知を送信するチャンネル ID を設定します
- `role`
  - メンションを行うユーザー ID もしくは、ロールを設定します

### カテゴリー: seichi_achievement

このカテゴリーでは、整地鯖実績通知に関する設定が可能です

- `channel`
  - 投票通知を送信するチャンネル ID を設定します
- `role`
  - メンションを行うユーザー ID もしくは、ロールを設定します

### カテゴリー: kagawa_notification

このカテゴリーでは、香川チャレンジ通知に関する設定が可能です

- `channel`
  - 投票通知を送信するチャンネル ID を設定します
- `role`
  - メンションを行うユーザー ID もしくは、ロールを設定します

### カテゴリー: url_show_ignore

このカテゴリーでは、URL 展開機能を無視するチャンネルの指定が可能です

- `channels`
  - URL 展開機能を無視するチャンネル ID を設定します（複数設定可）
  - 指定のチャンネル・スレッドからはメッセージ取得せず、その他のチャンネル・スレッドへの展開を行いません
