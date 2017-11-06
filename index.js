var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname + "/dist")));

app.use("/assets", express.static(__dirname + '/dist/assets'));

// viewed at based directory http://localhost:8080/
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

// add other routes below
app.get('/about', function (req, res) {
  res.sendFile(path.join(__dirname + '/views/about.html'));
});
app.listen(process.env.PORT || 1234);
