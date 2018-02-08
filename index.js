var express    = require('express'),
    app        = express(),
    port       = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    morgan     = require('morgan');
    
var apiRoutes = require("./routes/currency");

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.send("Exchange rate server online");
});

app.use('/api/', apiRoutes);

app.listen(port, function(){
    console.log("Exchange rate relay server started on port: " + process.env.PORT);
});