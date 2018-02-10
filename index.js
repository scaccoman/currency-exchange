const express    = require('express'),
      app        = express(),
      port       = process.env.PORT || 3000,
      bodyParser = require('body-parser'),
      morgan     = require('morgan');
    
const apiRoutes = require("./routes/currency");

if (process.env.NODE_ENV !== "production"){
    app.use(morgan('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname +'/client')); //SERVING STATIC HTML REACT BUILD

app.get('/', function(req, res){
    res.sendFile("index.html");
});

app.use('/api/', apiRoutes);

app.listen(port, function(){
    console.log("APP IS RUNNING ON PORT " + process.env.PORT);
})