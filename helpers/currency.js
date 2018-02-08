var request = require("request");
var fs = require("fs");
var ROOT_URL = "https://openexchangerates.org/api/latest.json?app_id=";
var API_KEY  = process.env.API_KEY || "f8e1c9cbfc18487ca598143236557288";

var requestRates = function(callback){
    var age = JSON.parse(fs.readFileSync('./data/ratesAge.json', 'utf8'));
    var now = new Date().getTime();
    //check if the exchange rates are older then 60 minutes
    if (now >= age + 3600000) {
        request(ROOT_URL + API_KEY, function(error, response, body){
            if (!error && response.statusCode == 200){
              var rates = JSON.parse(body).rates;
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
    } else if (now < age + 3600000) {
        var rates = JSON.parse(fs.readFileSync('./data/rates.json', 'utf8'));
        callback(null, rates);
    }
};

var calcExchange = function(base, target, rates, amount){
    var valueInUsd = (1 / rates[base]) * amount;
    var valueInTargetCurrency = valueInUsd * rates[target];
    return valueInTargetCurrency;
};

exports.getRates = function(req, res){
    requestRates(function(err, rates) {
    if (err) return res.send(err);
    var result = calcExchange(req.query.base, req.query.target, rates, req.query.amount);
    res.send(JSON.stringify(result));
  });
};

exports.getIndex = function(req, res){
    res.send("get route / working");
    // db..find()
    // .then(function(todos){
    //     res.json(todos);
    // })
    // .catch(function(err){
    //     res.send(err);
    // })
};

module.exports = exports;