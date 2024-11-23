const logger = require("../modules/logger");
const config = require("../utils/get-config");
const check_admin = require("../utils/check-admin");
const { EmbedBuilder } = require("discord.js");
const color = require("../utils/color-code");

exports.run = (client, message, args) => {
    const permission_check = check_admin(message, client);

    if (permission_check == "owner: no") {
        return;
    }

    const err_not_args = new EmbedBuilder({
        title: "コードの評価",
        description: "ERROR: 評価するコードが入力されていません",
        color: color.ERROR,
        fields: [
            {
                name: "入力",
                value: "```\n" + "N/A" + "\n```",
            },
            {
                name: "出力",
                value: "```\n" + "N/A" + "\n```",
            },
        ],
    });

    if (args.length == 0) {
        message.channel.send({ embeds: [err_not_args] });
        return;
    }

    const clean = async (text) => {
        // If our input is a promise, await it before continuing
        if (text && text.constructor.name == "Promise") text = await text;

        // If the response isn't a string, `util.inspect()`
        // is used to 'stringify' the code in a safe way that
        // won't error out on objects with circular references
        // (like Collections, for example)
        if (typeof text !== "string") text = require("util").inspect(text, { depth: 1 });
        text = text.replaceAll(config.mongodb.url, "****");
        // Replace symbols with character code alternatives
        text = text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        text = text.replaceAll(config.bot.token, "****");
        // Send off the cleaned up result
        return text;
    };

    async function run() {
        // Get our input arguments
        const args = message.content.split(" ").slice(1);
        const input = args.join(" ");
        // In case something fails, we to catch errors
        // in a try/catch block
        try {
            // Evaluate (execute) our input
            const evaled = eval(args.join(" "));

            // 入力値規制
            if (args.length >= 1000) {
                const err_input_long = new EmbedBuilder({
                    title: "コードの評価",
                    description: "ERROR: 入力値が1000文字を超えたため表示しません...",
                    color: color.ERROR,
                    fields: [
                        {
                            name: "入力",
                            value: "```js\n" + "入力値が1000文字以上でした..." + "\n```",
                        },
                        {
                            name: "出力",
                            value: "```js\n" + "N/A" + "\n```",
                        },
                    ],
                });
                message.channel.send({ embeds: [err_input_long] });
                logger.warn("入力値が1000字を超えたため処理を中断しました");
                return;
            }

            const err_not_output = new EmbedBuilder({
                title: "コードの評価",
                description: "出力がありませんでしたが、コードの実行には成功しました",
                color: color.CMD_RUN,
                fields: [
                    {
                        name: "入力",
                        value: "```js\n" + input + "\n```",
                    },
                    {
                        name: "出力",
                        value: "```js\n" + "N/A" + "\n```",
                    },
                ],
            });

            const cleaned = await clean(evaled);

            if (!evaled) {
                message.channel.send({ embeds: [err_not_output] });
                return;
            }

            // ページを作成したり分割したり
            const output_1 = cleaned.slice(0, 1000);
            const output_2 = cleaned.slice(1000, 2000);
            const output_3 = cleaned.slice(3000, 4000);
            const output_4 = cleaned.slice(4000, 5000);
            const output_5 = cleaned.slice(5000, 6000);
            const page1 = new EmbedBuilder({
                title: "コードの評価",
                description: "コードを評価しました (1ページ目)",
                color: color.CMD_RUN,
                fields: [
                    {
                        name: "入力",
                        value: "```js\n" + input + "\n```",
                    },
                    {
                        name: "出力",
                        value: "```js\n" + output_1 + "\n```",
                    },
                ],
            });
            const page2 = new EmbedBuilder({
                title: "コードの評価",
                description: "コードを評価しました (2ページ目)",
                color: color.CMD_RUN,
                fields: [
                    {
                        name: "2ページ目",
                        value: "```js\n" + output_2 + "\n```",
                    },
                ],
            });
            const page3 = new EmbedBuilder({
                title: "コードの評価",
                description: "コードを評価しました (3ページ目)",
                color: color.CMD_RUN,
                fields: [
                    {
                        name: "3ページ目",
                        value: "```js\n" + output_3 + "\n```",
                    },
                ],
            });
            const page4 = new EmbedBuilder({
                title: "コードの評価",
                description: "コードを評価しました (4ページ目)",
                color: color.CMD_RUN,
                fields: [
                    {
                        name: "4ページ目",
                        value: "```js\n" + output_4 + "\n```",
                    },
                ],
            });
            const page5 = new EmbedBuilder({
                title: "コードの評価",
                description: "コードを評価しました (最終ページ)",
                color: color.CMD_RUN,
                fields: [
                    {
                        name: "5ページ目",
                        value: "```js\n" + output_5 + "\n```",
                    },
                ],
            });

            // メッセージ送信
            message.channel.send({ embeds: [page1] });
            if (output_2.length >= 1) {
                message.channel.send({ embeds: [page2] });
            }
            if (output_3.length >= 1) {
                message.channel.send({ embeds: [page3] });
            }
            if (output_4.length >= 1) {
                message.channel.send({ embeds: [page4] });
            }
            if (output_5.length >= 1) {
                message.channel.send({ embeds: [page5] });
            }
        } catch (err) {
            logger.error("コマンド評価時にエラーをキャッチしました");
            logger.error(err);
            const err_detail = new EmbedBuilder({
                title: "エラーキャッチ内容",
                description: "",
                color: color.NOTIFY,
                fields: [
                    {
                        name: "入力",
                        value: "```js\n" + input + "\n```",
                    },
                    {
                        name: "出力",
                        value: "```js\n" + err + "\n```",
                    },
                ],
            });
            message.channel.send({ embeds: [err_detail] });
        }
    }

    // じっこう
    run();
};

exports.name = "eval";
