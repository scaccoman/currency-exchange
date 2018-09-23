const express    = require('express'),
      app        = express(),
      port       = process.env.PORT || 3000,
      bodyParser = require('body-parser'),
      morgan     = require('morgan'),
      fs         = require("fs"),
      path       = require('path'),
      rfs        = require('rotating-file-stream');
    
const apiRoutes = require("./routes/currency");


const logDirectory = path.join(__dirname, 'log');
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
 
// rotating write stream
const accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: logDirectory
});
app.use(morgan('combined', {stream: accessLogStream}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname +'/client/build')); //Serve static React build

app.get('/', function(req, res){
    res.sendFile(__dirname + 'index.html');
});

app.use('/api/', apiRoutes);

app.listen(port, function(){
    console.log("APP IS RUNNING ON PORT " + port);
})