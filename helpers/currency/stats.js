const fs = require("fs");
let statsCache = read(); //cache stats for better performance

exports.save = function(target, amount){
    //read stats from cache or json
    const stats = statsCache || read();
    stats.currencies[target]++;
    stats.totalUSD += amount;
    //loop through currencies to get most used one and number of conversions
    Object.keys(stats.currencies).forEach(function(key){
        stats.totalReq += stats.currencies[key];
        if (stats.currencies[key] > stats.highestNum) {
            stats.topCurrency = key;
            stats.highestNum  = stats.currencies[key];
        }
    });
    statsCache = stats
    //save stats to disk
    fs.writeFile( "./data/stats.json", JSON.stringify(stats), "utf8", function(){
        // console.log("stats saved successfully");
    });
};

//send cached stats
exports.send = function(){
    return statsCache ? statsCache : read();
};

//first time, stats read
function read(){
    const stats = JSON.parse(fs.readFileSync('./data/stats.json', 'utf8'));
    return stats;
}

exports.reset = function(){
    const stats = JSON.parse(fs.readFileSync('./data/stats.json', 'utf8'));
    Object.keys(stats.currencies).forEach(function(key){
        stats.currencies[key] = 0;
    });
    stats.totalReq = 0;
    stats.totalUSD = 0;
    stats.highestNum = 0;
    fs.writeFile( "./data/stats.json", JSON.stringify(stats), "utf8", function(){
        console.log("stats reset successfully");
    });
};

module.exports = exports;