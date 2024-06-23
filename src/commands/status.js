const { MessageEmbed } = require("discord.js");
const os = require("os");
const package = require("../../package.json");
const logger = require("../modules/logger");
const err_embed = require("../utils/error-embed");
const config = require("../utils/get-config");
const color = require("../utils/color-code");

exports.run = (client, message) => {
    function floorDecimal(val, digit) {
        return Math.floor(val * Math.pow(10, digit)) / Math.pow(10, digit);
    }
    try {
        // 空きメモリを計算
        const freemem_byte = os.freemem;
        const freemem_kb = freemem_byte / 1024;
        const freemem_mb = freemem_kb / 1024;
        const freemem_gb = freemem_mb / 1024;
        // 合計メモリを計算
        const totalmem_byte = os.totalmem;
        const totalmem_kb = totalmem_byte / 1024;
        const totalmem_mb = totalmem_kb / 1024;
        const totalmem_gb = totalmem_mb / 1024;
        // メモリ使用率を計算
        const mem_gb_per = (freemem_gb / totalmem_gb) * 100;
        // プロセス全体の使用メモリを計算
        const heapmem_byte = process.memoryUsage().rss;
        const heapmem_mb = heapmem_byte / Math.pow(1024, 2);

        // 小数桁の切り下げ
        const freemem = floorDecimal(freemem_gb, 2);
        const totalmem = floorDecimal(totalmem_gb, 2);
        const mempercent = floorDecimal(mem_gb_per, 2);
        const heapmem = floorDecimal(heapmem_mb, 2);
        const embed = new MessageEmbed({
            title: "SystemStatus",
            color: color.CMD_RUN,
            footer: {
                text: "System Status",
            },
            fields: [
                {
                    name: "OS Information",
                    value: os.type() + "," + os.version() + " " + os.arch(),
                },
                {
                    name: "OS Free Memory / Total Memory",
                    value: freemem + " / " + totalmem + "GB",
                },
                {
                    name: "OS Memory Usage Per",
                    value: mempercent + "%",
                },
                {
                    name: "Process Total Memory",
                    value: heapmem + "MB",
                },
                {
                    name: "Bot Version",
                    value: package.version,
                    inline: true,
                },
                {
                    name: "Node.js Version",
                    value: process.version,
                    inline: true,
                },
                {
                    name: "Discord.js Version",
                    value: require("discord.js").version,
                    inline: true,
                },
            ],
        });
        message.channel.send({ embeds: [embed] });
    } catch (err) {
        logger.error("コマンド実行エラーが発生しました");
        logger.error(err);
        message.channel.send({ embeds: [err_embed.main] });
        if (config.debug.enable.includes("true")) {
            message.channel.send({ embeds: [err_embed.debug] });
            message.channel.send("エラー内容: ");
            message.channel.send("```\n" + err + "\n```");
        }
    }
};

exports.name = "status";
