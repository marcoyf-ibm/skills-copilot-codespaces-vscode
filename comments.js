// Create web server and listen on port 3000
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/comments', function (req, res) {
  fs.readFile(__dirname + '/comments.json', 'utf8', function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});

app.post('/comments', function (req, res) {
  fs.readFile(__dirname + '/comments.json', 'utf8', function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile(__dirname + '/comments.json', JSON.stringify(comments, null, 4), function (err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(comments));
    });
  });
});

app.listen(3000, function () {
  console.log('Server is running on port 3000');
});