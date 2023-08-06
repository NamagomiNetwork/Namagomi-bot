const { MessageEmbed } = require('discord.js');
const os = require('os')
const freemem_byte = os.freemem()
const freemem_kb = freemem_byte /1024
const freemem = freemem_kb /1024

var msg = new MessageEmbed({
    title: "コマンドの実行に失敗しました...",
    color: 16601703,
    description: "管理者にお問い合わせください",
    fields: [
        {
            name: "原因として下記の可能性があります",
            value: "botの障害, バグ"
        },
    ]
})
var msg_debug = new MessageEmbed({
    title: "debug mode",
    color: 16601703,
    description: "debug information",
    "footer": {
        "text": "System Status"
    },
    fields: [
        {
            name: "Os Information",
            value: os.type() + "," + os.version() + " " + os.arch()
        },
        {
            name: "Free Memory",
            value: freemem + " MB"
        },
    ]
})
exports.main = msg
exports.debug = msg_debug