//NOTE:括弧書きの10進数は2024/01/04現在でMessageEmbedに埋め込まれている直値なので定数に置き換え後削除する。

const NOTIFY_COLOR = 0x4a90e2; //強い青紫系の色(4886754)
const ATTENTION_COLOR = 0xfd5267; //明るい赤系の色(16601703)
const ERROR_COLOR = 0xfd5267; //明るい赤系の色(16601703)
const DETAIL_COLOR = 0xffff12; //あざやかな黄系の色(16776978)
const BLOCKED_NOTIFY_COLOR = 0x3acad6; //強い青系の色(3853014)

const CMD_RUN_COLOR = 0x50e3c2; //強い青緑系の色(5301186)

// region export color-code constant
module.exports = {
    NOTIFY: NOTIFY_COLOR,
    ATTENTION: ATTENTION_COLOR,
    ERROR: ERROR_COLOR,
    DETAIL: DETAIL_COLOR,
    CMD_RUN: CMD_RUN_COLOR,
    BLOCKED_NOTIFY: BLOCKED_NOTIFY_COLOR,
};
// endregion

// ref:HTMLカラーコード: WEB色見本 原色大辞典(https://www.colordic.org/)
