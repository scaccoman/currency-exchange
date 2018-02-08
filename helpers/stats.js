const fs = require("fs");

exports.save = function(target, amount){
    const stats = JSON.parse(fs.readFileSync('./data/stats.json', 'utf8'));
    stats.currencies[target]++;
    stats.total += amount;
    fs.writeFile( "./data/stats.json", JSON.stringify(stats), "utf8", function(){
        console.log("stats stored successfully");
    });
};

exports.read = function(){
    const stats = JSON.parse(fs.readFileSync('./data/stats.json', 'utf8'));
    let result = {
        topCurrency : "",
        highestNum  : 0,
        totalReq    : 0,
        totalUSD    : stats.total
    };
    Object.keys(stats.currencies).forEach(function(key){
        result.totalReq += stats.currencies[key];
        if (stats.currencies[key] > result.highestNum) {
            result.topCurrency = key;
            result.highestNum  = stats.currencies[key];
        }
    });
    return result;
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