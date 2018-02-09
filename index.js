const express    = require('express'),
    app        = express(),
    port       = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    morgan     = require('morgan');
    
const apiRoutes = require("./routes/currency");

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static(__dirname +'/public'));
// app.use(express.static(__dirname + '/views')); TO MODIFY TO SERVER STATIC REACT APP

app.get('/', function(req, res){
    res.sendFile("index.html");
});

app.use('/api/', apiRoutes);

app.listen(port, function(){
    console.log("APP IS RUNNING ON PORT " + process.env.PORT);
})
    
    