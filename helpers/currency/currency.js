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
            util.requestRates(function(err, rates) {
                if (err) return res.status(500).send(err);
                const result = util.calcExchange(base, target, amount, rates);
                
                if (util.validateOutput(result)){
                    res.send(JSON.stringify(result));
                    stats.save(target, result);
                } else {
                    res.status(500).send('Invalid base or target currency!');
                }
            });
            
        //otherwise read stored rates
        } else if (now < util.age + 3600) {;
            const result = util.calcExchange(base, target, amount, util.rates);
            
            if (util.validateOutput(result)){
                res.send(JSON.stringify(result));
                stats.save(target, result);
            } else {
                res.status(500).send('Invalid base or target currency!');
            }
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