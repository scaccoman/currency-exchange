const fs      = require("fs"),
      util    = require("./currencyUtil");

exports.getRates = function(req, res){
    const base = req.query.base;
    const target = req.query.target;
    const amount = req.query.amount;
    
    //check if query is valid
    if (util.validateQuery(base, target, amount)){
        const age = JSON.parse(fs.readFileSync('./data/ratesAge.json', 'utf8'));
        const now = new Date().getTime();

        //check if the exchange rates are older then 60 minutes
        if (now >= age + 3600000) {
            util.requestRates(function(err, rates) {
                if (err) return res.send(err);
                const result = util.calcExchange(base, target, rates, amount);
                res.send(JSON.stringify(result));
            });
        } else if (now < age + 3600000) {
            const rates = JSON.parse(fs.readFileSync('./data/rates.json', 'utf8'));
            const result = util.calcExchange(base, target, rates, amount);
            res.send(JSON.stringify(result));
        }
    } else {
        res.send("Query parameters not valid!");
    }
};

exports.getIndex = function(req, res){
    res.send("Exchange rate server online");
};

module.exports = exports;