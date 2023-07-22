const logger = require("../modules/logger");
const err_embed = require("../utils/error-embed");
const config = require("../utils/get-config");
const TawasiModel = require("../utils/Schema/TawasiSchema");
const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
	try {
		const tawasiData = await TawasiModel.findOne({ _id: message.author.id });

		if (!tawasiData) {
			logger.error(
				"ユーザー名: " +
					message.author.username +
					" ユーザーID: " +
					message.author.id +
					"のたわしプロファイル作成中にエラーが発生しました..."
			);
			message.channel.send({ embeds: [err_embed.main] });
			return;
		}

		if (tawasiData.one_day_tawasi_feature.includes("true")) {
			var disenable = new MessageEmbed({
				title: "1日1たわしの無効化",
				description: "1日1たわしを無効化しました",
				color: 5301186,
				footer: {
					text: "たわし",
				},
				fields: [
					{
						name: "有効化するには",
						value: "もういっかいこのコマンドを実行してください",
					},
				],
			});
			message.channel.send({ embeds: [disenable] });
			await tawasiData.updateOne({
				one_day_tawasi_feature: false,
			});
			return;
		} else {
			var enable = new MessageEmbed({
				title: "1日1たわしの有効化",
				description: "1日1たわしを有効化しました",
				color: 5301186,
				footer: {
					text: "たわし",
				},
				fields: [
					{
						name: "無効化するには",
						value: "もういっかいこのコマンドを実行してください",
					},
				],
			});
			message.channel.send({ embeds: [enable] });
			await tawasiData.updateOne({
				one_day_tawasi_feature: true,
			});
		}
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

exports.name = "one_day_tawasi";
