> **WARNING:** 現在このbotは開発版です。このbotを使用して得た不利益について NamagomiNetworkは一切保証致しません

# configファイルの作成

このセクションでは、configの作成を行います

## sampleConfigからのコピー

- `configs` ディレクトリにある `sample_config.json` を `config.json` に名称を変更します

## configファイルの編集

バージョン `2.0.0-debug-1` 現在、下記の項目が設定可能です

- `token`
    - Discord botのTOKENを指定してください
- `prefix`
    - Botコマンドの接頭辞を設定します
    - (例: `!g` を指定した場合helpは `!g help` で参照可能になります)
- `owner`
    - Bot管理者のユーザーIDを入力します(複数指定可能)
    - **WARNING:** この項目に入力したユーザーは、evalコマンドなどの管理コマンドが使えるようになります。付与の際は最大限の注意をしてください
- `syslog`
    - この項目にはチャンネルIDを指定してください
    - 指定したチャンネルに、Botの一部動作ログを送信します
- `seichivote`
    - この機能は、整地鯖への投票通知を行う機能です
    - 無効化する場合 `enable` の項目を falseに、有効化する場合は true に設定してください
    - 設定項目2 `role` : この項目にはメンションするロールIDを指定してください
    - 設定項目3 `channel` : この項目には送信するチャンネルIDを指定してください
- `seichi_achievement`
    - **未実装** 2.0.0-debug-2を目処に実装する予定です
- `log`
    - **WARNING**: この項目ではログ出力機能 `log4js` のconfigを定義しています。よく分からない場合、決して編集しないでください
- `botlog_system`
    - **未実装** 2.0.0-debug-2を目処に実装する予定です
    - **WARNING**: この項目は複数サーバーにbotを導入する場合、無効化してください
- `command_settings`
    - この項目では、一部コマンドの有効化,無効化を切り替えることができます。
    - trueで有効,falseで無効に設定することができます