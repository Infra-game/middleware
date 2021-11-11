/*const express = require('express');
const app = express();
app.listen(3000, () => {console.log('server is listening on port 3000')});
*/
var health = require('express-ping');
var express = require('express');

var app = express();

app.use(health.ping()); // this is the only addition
app.use(app.router);


app.listen(3000);