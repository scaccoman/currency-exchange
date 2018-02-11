const fs = require("fs");
let statsCache = read(); //cache stats to avoid r/w conflicts

exports.save = function(target, amount){
    //read stats from json
    const stats = JSON.parse(fs.readFileSync('./data/stats.json', 'utf8'));
    stats.currencies[target]++;
    stats.totalUSD += amount;
    //loop through currencies to get most used one and total amount converted
    Object.keys(stats.currencies).forEach(function(key){
        stats.totalReq += stats.currencies[key];
        if (stats.currencies[key] > stats.highestNum) {
            stats.topCurrency = key;
            stats.highestNum  = stats.currencies[key];
        }
    });
    //cache new stats
    statsCache = {
        totalReq: stats.totalReq,    
        totalUSD: stats.totalUSD,
        highestNum: stats.highestNum,
        topCurrency: stats.topCurrency
    };
    //save stats to disk
    fs.writeFile( "./data/stats.json", JSON.stringify(stats), "utf8", function(){
        console.log("stats stored successfully");
    });
};

//send cached stats
exports.send = function(){
    return statsCache;
};

//first time only stats read
function read(){
    const stats = JSON.parse(fs.readFileSync('./data/stats.json', 'utf8'));
    return {
        totalReq: stats.totalReq,    
        totalUSD: stats.totalUSD,
        highestNum: stats.highestNum,
        topCurrency: stats.topCurrency
    };
}

// exports.reset = function(){
//     const stats = JSON.parse(fs.readFileSync('./data/stats.json', 'utf8'));
//     Object.keys(stats.currencies).forEach(function(key){
//         stats.currencies[key] = 0;
//     });
//     stats.total = 0;
//     fs.writeFile( "./data/stats.json", JSON.stringify(stats), "utf8", function(){
//         console.log("stats reset successfully");
//     });
// };

module.exports = exports;