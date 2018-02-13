const request = require("request"),
      fs      = require("fs");
const ROOT_URL = "https://openexchangerates.org/api/latest.json?app_id=";
const API_KEY  = process.env.API_KEY || "f8e1c9cbfc18487ca598143236557288";

//export cache variables
exports.age   = JSON.parse(fs.readFileSync('./data/ratesAge.json', 'utf8'));
exports.rates = JSON.parse(fs.readFileSync('./data/rates.json', 'utf8'));

//external API call, new rates available every 60 minutes with free account
exports.requestRates = function(callback){
        request(ROOT_URL + API_KEY, function(error, response, body){
            if (!error && response.statusCode == 200){
                //get rates data out of response and write to disk
                const data = JSON.parse(body);
                fs.writeFile( "./data/rates.json", JSON.stringify(data.rates), "utf8", function(){
                    console.log("rates stored successfully");
                    fs.writeFile( "./data/ratesAge.json", JSON.stringify(data.timestamp), "utf8", function(){
                        console.log("age stored successfully");
                     });
                });
                callback(null, data);
            } else {
                callback(error);
            }
        });
};

//rates are provided only in USD base with free API key
exports.calcExchange = function(base, target, amount, rates){
    const valueInUsd = (1 / rates[base]) * amount;
    const valueInTargetCurrency = valueInUsd * rates[target];
    return valueInTargetCurrency;
};

exports.validateQuery = function(base, target, amount) {
    if (base.match("^[A-Z]{3}$") 
    && target.match("^[A-Z]{3}$") 
    && amount.toString().match("^[0-9]*[.]{1}[0-9]*$|^[0-9]*$")) {
        return true;
    } else {
        return false;
    }
};

exports.validateOutput = function(result) {
    if (result.toString().match("^[0-9]*[.]{1}[0-9]*$|^[0-9]*$")){
        return true;
    }
    return false;
};

module.exports = exports;