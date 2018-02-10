const fs = require("fs");

exports.save = function(target, amount){
    const stats = JSON.parse(fs.readFileSync('./data/stats.json', 'utf8'));
    stats.currencies[target]++;
    stats.totalUSD += amount;
    Object.keys(stats.currencies).forEach(function(key){
        stats.totalReq += stats.currencies[key];
        if (stats.currencies[key] > stats.highestNum) {
            stats.topCurrency = key;
            stats.highestNum  = stats.currencies[key];
        }
    });
    fs.writeFile( "./data/stats.json", JSON.stringify(stats), "utf8", function(){
        console.log("stats stored successfully");
    });
};

exports.read = function(){
    const stats = JSON.parse(fs.readFileSync('./data/stats.json', 'utf8'));
    return { 
        totalReq: stats.totalReq,    
        totalUSD: stats.totalUSD,
        highestNum: stats.highestNum,
        topCurrency: stats.topCurrency
    };
};

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