module.exports = (client) =>{

    const current_year = new Date().getFullYear();
    const fs = require('fs');
    let path = require('path');
    const config_path = "/../../configs/seichi_achievements.json";

    const logger = require("../modules/logger");
    let config = JSON.parse(
        fs.readFileSync(__dirname+config_path,'utf-8')
    );
    console.log(config)
    logger.info(current_year+"年：記念日実績通知用configを更新します。")

    set_spring_equinox_day();
    set_mothersDay();
    set_fathersDay();
    write_JSON_file(config);

    function set_mothersDay(){
        const SUNDAY = 0; //日曜日
        let result_date = get_weekOfDay(current_year,5,2,SUNDAY);
        logger.info("母の日："+result_date);
        config.mothers_day.date = result_date;
    }

    function set_fathersDay()
    {
        const SUNDAY = 0; //日曜日
        let result_date = get_weekOfDay(current_year,6,3,SUNDAY);
        logger.info("父の日："+result_date);
        config.fathers_day.date = result_date;
    }

    function set_spring_equinox_day(){
        const month = "3";
        let day = "";
        
        if(current_year < 1980 ){
            day = (current_year >= 1960 && current_year % 4 == 0) ? "3/20":"3/21";
        }
        else{
            day = parseInt(20.8431 + 0.242194 * (current_year- 1980)) - parseInt((current_year-1980)/4);
            day.toString();
        }
        let result_date = month + "/" + day
        logger.info("春分の日：" + result_date);
        config.spring_equinox_day.date = result_date;
    }

    function set_harvest_moon(){
        //Todo
    }   
    function write_JSON_file(obj){
        const SPACE = 2 //JSON文字列の整形出力
        fs.writeFileSync(
            (__dirname+config_path),JSON.stringify(obj,null,SPACE)
        )
    }

    function get_weekOfDay(current_year,month,week,day){
        //指定年月の最初の曜日を算出
        let date = new Date(current_year+"/"+month+"/1");
        let first_day = date.getDay();

        //求めたい曜日の第1週目日付を算出して、指定週まで日を足す
        day = day - first_day +1;
        day += 7*(week);
        
        // 結果の整形・加工
        let result = new Date(current_year+"/"+month+"/"+day);
        let result_m = parseInt(result.getMonth())+1;
        let result_d = parseInt(result.getDate());
        result = result_m.toString() +"/"+result_d.toString();
        return result;
    }

    function convert_old2new(){
        //Todo
    }

}