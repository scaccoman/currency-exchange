const fs      = require("fs"),
      util    = require("./currencyUtil"),
      stats   = require("./stats");

exports.getRates = function(req, res){
    const base   = req.query.base,
          target = req.query.target,
          amount = req.query.amount;
    
    //check if query is valid
    if (util.validateQuery(base, target, amount)){
        const age = JSON.parse(fs.readFileSync('./data/ratesAge.json', 'utf8'));
        const now = new Date().getTime();

        //if the exchange rates are older then 60 minutes, get new rates
        if (now >= age + 3600000) {
            util.requestRates(function(err, rates) {
                if (err) return res.send(err);
                const result = util.calcExchange(base, target, rates, amount);
                res.send(JSON.stringify(result));
            });
        //otherwise read stored rates
        } else if (now < age + 3600000) {
            const rates = JSON.parse(fs.readFileSync('./data/rates.json', 'utf8'));
            const result = util.calcExchange(base, target, rates, amount);
            console.log(result);
            
            //validate output
            if (result.toString().match("^[0-9]*[.]{1}[0-9]*$|^[0-9]*$")){
                stats.save(target, result);
                res.send(JSON.stringify(result));
            } else {
                res.send("Invalid base or target currency!");
            }
        }
    } else {
        res.send("Invalid query parameters!");
    }
};

//API test route
exports.getIndex = function(req, res){
    // stats.reset();
    res.send("Exchange rate server online");
};

exports.getStats = function(req, res){
    res.send(JSON.stringify(stats.read()));
};

module.exports = exports;