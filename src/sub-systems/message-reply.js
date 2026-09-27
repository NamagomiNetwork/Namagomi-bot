const TawasiModel = require("../utils/Schema/TawasiSchema");
module.exports = async (message) => {
    // たわしさん
    const tawasiData = await TawasiModel.findOne({ _id: message.author.id });
    if (!tawasiData) {
        if (message.content.includes("たわしさん")) {
            message.channel.send("1日1たわしさんのデータが存在しません \n コマンドを実行してください");
        }
    } else {
        if (message.content.includes("たわしさん")) {
            if (tawasiData.tawasi.includes("true")) {
                return;
            }
            if (tawasiData.one_day_tawasi_feature.includes("false")) {
                return;
            }
            message.channel.send("https://i.gyazo.com/474615a2f55557c6f091629487752897.webp");
            await tawasiData.updateOne({
                tawasi: true,
            });
        }
    }
    // 豚
    if (message.content.includes("とってもおいしい豚さん")) {
        message.channel.send("https://i.gyazo.com/56fd3920744ce61d9e7eeb3fdfec2cc6.webp");
    }
};
