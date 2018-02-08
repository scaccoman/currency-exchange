var express = require('express');
var router = express.Router();
var helpers = require("../helpers/currency");

router.route('/')
 .get(helpers.getIndex);
 
 router.route('/stats/')
 .get(helpers.getStats);
 
router.route('/calculate_exchange/') //?base=EUR&target=CZK&amount=123456
  .get(helpers.getRates);
  
module.exports = router;