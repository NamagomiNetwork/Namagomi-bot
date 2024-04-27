const { MessageEmbed } = require("discord.js");
const os = require("os");
const color = require("./color-code");

const freemem_byte = os.freemem();
const freemem_kb = freemem_byte / 1024;
const freemem = freemem_kb / 1024;

const msg = new MessageEmbed({
    title: "コマンドの実行に失敗しました...",
    color: color.ERROR,
    description: "管理者にお問い合わせください",
    fields: [
        {
            name: "原因として下記の可能性があります",
            value: "botの障害, バグ",
        },
    ],
});
const msg_debug = new MessageEmbed({
    title: "debug mode",
    color: color.ERROR,
    description: "debug information",
    footer: {
        text: "System Status",
    },
    fields: [
        {
            name: "Os Information",
            value: os.type() + "," + os.version() + " " + os.arch(),
        },
        {
            name: "Free Memory",
            value: freemem + " MB",
        },
    ],
});
exports.main = msg;
exports.debug = msg_debug;
