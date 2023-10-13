#!/bin/bash
set -e

# /config.jsonがあるか確認をする

if [ ! -e /config.json ];then
    echo "config.jsonファイルが /config.json にマウントされていません..."
    exit 1
fi

git clone https://github.com/NamagomiNetwork/Namagomi-bot.git
cp /config.json /Namagomi-bot/config.json
cd Namagomi-bot

# ここで起動
node bot.js