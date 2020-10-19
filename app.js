const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const route = require('./server');
require('dotenv/config');
const PORT= 8000;
app.use(bodyParser.json());

app.use(function(req,res,next){

    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,OPTIONS,PUT,PATCH,DELETE");
    res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Authorization,Accept");
    next();

});
app.use('/',route);

app.listen(PORT);