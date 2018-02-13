const fs      = require("fs"),
      util    = require("./utility"),
      stats   = require("./stats");

exports.getConversion = function(req, res){
    //exctract data from query
    const base   = req.query.base,
          target = req.query.target,
          amount = req.query.amount;
    
    //check if query is valid
    if (util.validateQuery(base, target, amount)){
        //get time in Seconds
        const now = (new Date().getTime() / 1000).toFixed();
        //if the exchange rates are older then 60 minutes, get new rates
        if (now >= util.age + 3600) {
            util.requestRates(function(err, data) {
                if (err) return res.status(500).send(err);
                //cache rates
                util.age   = data.timestamp;
                util.rates = data.rates;
                const result = util.calcExchange(base, target, amount, data.rates);
                // if result is valid number send it over and update stats
                if (util.validateOutput(result)){
                    res.send(JSON.stringify(result));
                    stats.save(target, result);
                } else {
                    console.error('Invalid base or target currency!')
                    res.status(500).send('Invalid base or target currency!');
                }
            });
            
        //otherwise read stored rates
        } else if (now < util.age + 3600) {
            const result = util.calcExchange(base, target, amount, util.rates);
            // if result is valid number send it over and update stats
            if (util.validateOutput(result)){
                res.send(JSON.stringify(result));
                stats.save(target, result);
            } else {
                console.error('Invalid base or target currency!');
                res.status(500).send('Invalid base or target currency!');
            }
        } else {
            console.error("invalid timestamp");
            util.age = JSON.parse(fs.readFileSync('./data/ratesAge.json', 'utf8'));
            res.status(500).send("Internal error, please try again");
        }
    } else {
        res.status(500).send("Invalid query parameters!");
    }
};

//API test route
exports.getIndex = function(req, res){
    // stats.reset();
    res.send("Currency exchange server online");
};

exports.getStats = function(req, res){
    res.send(JSON.stringify(stats.send()));
};

module.exports = exports;