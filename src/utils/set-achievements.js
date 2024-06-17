const { MessageEmbed } = require("discord.js");
module.exports = (client) => {
    const current_year = new Date().getFullYear();
    const fs = require("fs");
    const config_path = "/../../configs/seichi_achievements.json";
    const logger = require("../modules/logger");
    let seichi_achievement = require("../utils/get-achievements");

    logger.info(current_year + "年：記念日実績通知用configを更新します");
    logger.info("=======================");
    set_spring_equinox_day();
    set_mothers_day();
    set_fathers_day();
    set_harvest_moon();
    logger.info("=======================");
    write_JSON_file(seichi_achievement);

    function set_mothers_day() {
        const SUNDAY = 0; //日曜日
        let result_date = get_weekOfDay(current_year, 5, 2, SUNDAY);
        logger.info("母の日：" + result_date);
        seichi_achievement.mothers_day.date = result_date;
    }

    function set_fathers_day() {
        const SUNDAY = 0; //日曜日
        let result_date = get_weekOfDay(current_year, 6, 3, SUNDAY);
        logger.info("父の日：" + result_date);
        seichi_achievement.fathers_day.date = result_date;
    }

    function set_spring_equinox_day() {
        const month = "3";
        let day = "";
        if (current_year > 1980) {
            day = parseInt(20.8431 + 0.242194 * (current_year - 1980)) - parseInt((current_year - 1980) / 4);
            day.toString();
        }
        let result_date = month + "/" + day;
        logger.info("春分の日：" + result_date);
        seichi_achievement.spring_equinox_day.date = result_date;
    }

    function set_harvest_moon() {
        //Ref:https://eco.mtk.nao.ac.jp/koyomi/wiki/C3E6BDA9A4CECCBEB7EEA4C8A4CF.html
        const array_date = ["9/29", "9/17", "10/6", "9/25", "9/15", "10/3"]; //2023年~2028年の中秋の名月となる日付
        const year = 2023;
        let result_date = "";

        result_date = array_date[current_year - year];
        logger.info("中秋の名月：" + result_date);
        seichi_achievement.harvest_moon.date = result_date;
    }

    function write_JSON_file(obj) {
        const SPACE = 2; //JSON文字列の整形出力
        let result = false;
        try {
            fs.writeFileSync(__dirname + config_path, JSON.stringify(obj, null, SPACE));
            result = true;
        } catch (err) {
            logger.error(err.message);
            result = false;
        }
        if (result) {
            logger.info("記念日実績通知用configの更新に成功しました");
        } else {
            logger.error("記念日実績通知用configの更新に失敗しました...");
        }
    }

    function get_weekOfDay(current_year, month, week, day) {
        //指定年月の最初の曜日を算出
        let date = new Date(current_year + "/" + month + "/1");
        let first_day = date.getDay();

        //求めたい曜日の第1週目日付を算出して、指定週まで日を足す
        day = day - first_day + 1;
        day += 7 * week;

        // 結果の整形・加工
        let result = new Date(current_year + "/" + month + "/" + day);
        let result_m = parseInt(result.getMonth()) + 1;
        let result_d = parseInt(result.getDate());
        result = result_m.toString() + "/" + result_d.toString();
        return result;
    }
};
