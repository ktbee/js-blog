var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = require(path.join(__dirname, '../', 'config'));

exports.index = function(req, res){
  res.render('layout');
};

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};

// CREATE
router.post('/api/posts', function(req, res) {

    var results = [];

    // Grab data from http request
    var data = {title: req.body.title, draft: req.body.draft, author: req.body.author};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Insert Data
        client.query("INSERT INTO posts(title, draft, author) values($1, $2, $3)", [data.title, data.draft, data.author]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM posts ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });


    });
});

// READ
router.get('/api/posts', function(req, res) {

    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM posts ORDER BY id ASC;");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });
        console.log(results);
        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });

});

// DELETE
router.delete('/api/posts/:post_id', function(req, res) {

    var results = [];

    // Grab data from the URL parameters
    var id = req.params.post_id;


    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Delete Data
        client.query("DELETE FROM posts WHERE id=($1)", [id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM posts ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });

}); 

module.exports = router;
