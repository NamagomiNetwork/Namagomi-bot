const logger = require("../modules/logger")
const config = require("../utils/get-config");

// このファイルでは無効化されている機能を検挙します

logger.info("現在下記の機能が無効化されています(無効化されていない場合表示はされません): ")
if(!config.command_settings.eval.includes("true")){
    logger.info("eval機能(コード実行機能)")
}

if(!config.command_settings.shell.includes("true")){
    logger.info("shell機能(シェル実行機能)")
}

if(!config.command_settings.shutdown.includes("true")){
    logger.info("botシャットダウン機能")
}

logger.info("機能の無効化一覧の取得に成功しました")