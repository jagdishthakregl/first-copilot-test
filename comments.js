// Create web server
// node comments.js
// http://localhost:3000

// Import Express
var express = require('express');
var app = express();

// Import Body Parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import File System
var fs = require('fs');

// Create comments.json file
fs.appendFile('comments.json', '', function(err) {
  if (err) throw err;
  console.log('comments.json file created.');
});

// Get all comments
app.get('/comments', function (req, res) {
  fs.readFile('comments.json', 'utf8', function(err, data) {
    if (err) throw err;
    res.send(data);
  });
});

// Add a comment
app.post('/comments', function (req, res) {
  var comment = req.body;
  fs.readFile('comments.json', 'utf8', function(err, data) {
    if (err) throw err;
    var comments = JSON.parse(data);
    comments.push(comment);
    fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
      if (err) throw err;
      res.send('Comment added.');
    });
  });
});

// Delete all comments
app.delete('/comments', function (req, res) {
  fs.writeFile('comments.json', '', function(err) {
    if (err) throw err;
    res.send('All comments deleted.');
  });
});

// Create server
var server = app.listen(3000, function () {
  console.log('Server running at http://localhost:3000');
});