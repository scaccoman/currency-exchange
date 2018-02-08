var request = require("request"),
    fs      = require("fs");
const ROOT_URL = "https://openexchangerates.org/api/latest.json?app_id=";
const API_KEY  = process.env.API_KEY || "f8e1c9cbfc18487ca598143236557288";

exports.requestRates = function(callback){
        request(ROOT_URL + API_KEY, function(error, response, body){
            if (!error && response.statusCode == 200){
                //get rates data out of json
                const rates = JSON.parse(body).rates;
                rates.USD = 1;
                //store rates and timestamp in json files
                fs.writeFile( "./data/rates.json", JSON.stringify(rates), "utf8", function(){
                    console.log("rates stored successfully");
                    fs.writeFile( "./data/ratesAge.json", JSON.stringify(new Date().getTime()), "utf8", function(){
                        console.log("age stored successfully");
                     });
                });
                callback(null, rates);
            } else {
                callback(error);
            }
        });
};

exports.saveStats = function(target, amount){
    const stats = JSON.parse(fs.readFileSync('./data/stats.json', 'utf8'));
    stats.currencies[target]++;
    stats.total += amount;
    fs.writeFile( "./data/stats.json", JSON.stringify(stats), "utf8", function(){
        console.log("stats stored successfully");
    });
};

// exports.resetStats = function(){
//     const stats = JSON.parse(fs.readFileSync('./data/stats.json', 'utf8'));
//     Object.keys(stats.currencies).forEach(function(key){
//         stats.currencies[key] = 0;
//     });
//     stats.total = 0;
//     fs.writeFile( "./data/stats.json", JSON.stringify(stats), "utf8", function(){
//         console.log("stats reset successfully");
//     });
// };

exports.calcExchange = function(base, target, rates, amount){
    const valueInUsd = (1 / rates[base]) * amount;
    const valueInTargetCurrency = valueInUsd * rates[target];
    return valueInTargetCurrency;
};

exports.validateQuery = function(base, target, amount) {
    if (base.match("^[A-Z]{3}$") 
        && target.match("^[A-Z]{3}$") 
        && amount.toString().match("^[0-9]*$")) {
        return true;
    } else {
        return false;
    }
};

module.exports = exports;