const year = new Date().getFullYear();
const fs = require('fs');
let path = require('path');
const config_path = "/../../configs/seichi_achievements.json";

const logger = require("../modules/logger");
let config = JSON.parse(
    fs.readFileSync(__dirname+config_path,'utf-8')
);
console.log(config)
logger.info(year+"年の記念日実績通知ファイルを更新します。")

set_spring_equinox_day();
write_JSON_file(config);
function set_mothersDay(){

}

function set_fathersDay()
{



}

function set_spring_equinox_day(){
    const month = "3/";
    let day = "";
    
    if(year < 1980 ){
        day = (year >= 1960 && year % 4 == 0) ? "3/20":"3/21";
    }
    else{
        day = parseInt(20.8431 + 0.242194 * (year- 1980)) - parseInt((year-1980)/4);
        day.toString();
    }
    let result_date = month + day
    logger.info("春分の日:" + result_date);
    config.spring_equinox_day.date = result_date.toString();
}

function set_harvest_moon(){
    
}
function write_JSON_file(obj){
    const SPACE = 2 //JSON文字列に空白挿入するための値
    fs.writeFileSync(
        (__dirname+config_path),JSON.stringify(obj,null,SPACE)
    )
}
