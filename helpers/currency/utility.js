var request = require("request"),
    fs      = require("fs");
const ROOT_URL = "https://openexchangerates.org/api/latest.json?app_id=";
const API_KEY  = process.env.API_KEY || "f8e1c9cbfc18487ca598143236557288";

exports.requestRates = function(callback){
        request(ROOT_URL + API_KEY, function(error, response, body){
            if (!error && response.statusCode == 200){
                //get rates data out of json
                const parsedBody = JSON.parse(body);
                parsedBody.rates.USD = 1;
                //store rates and timestamp in json files
                fs.writeFile( "./data/rates.json", JSON.stringify(parsedBody.rates), "utf8", function(){
                    console.log("rates stored successfully");
                    fs.writeFile( "./data/ratesAge.json", JSON.stringify(parsedBody.timestamp), "utf8", function(){
                        console.log("age stored successfully");
                     });
                });
                callback(null, parsedBody.rates);
            } else {
                callback(error);
            }
        });
};

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