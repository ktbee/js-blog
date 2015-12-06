var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = require(path.join(__dirname, '../', 'config'));


// Create post
router.post('/api/posts', function(req, res) {

    var results = [];
    var publishDate = new Date();

    // Grab data from http request
    var data = {title: req.body.title, draft: req.body.draft, author: req.body.author, published: publishDate };

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Insert Data 
        // Protects again SQL injections using parameters in the query
        // https://github.com/brianc/node-postgres/wiki/Prepared-Statements#user-content-parameterized-queries
        client.query("INSERT INTO posts(title, draft, author, published) values($1, $2, $3, $4)", [data.title, data.draft, data.author, data.published]);

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

// Read one post
router.get('/api/posts/:post_id', function(req, res) {

    var results = [];
    var id = req.params.post_id;

    pg.connect(connectionString, function(err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        var query =  client.query("SELECT * FROM posts WHERE id=($1)", [id]);

        query.on('row', function(row) {
            results.push(row);
        });

        query.on('end', function() {
            done();
            return res.json(results);
        });

    });

}); 

// Read posts
router.get('/api/posts', function(req, res) {

    var results = [];

    pg.connect(connectionString, function(err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        var query = client.query("SELECT * FROM posts ORDER BY id ASC;");

        query.on('row', function(row) {
            results.push(row);
        });

        query.on('end', function() {
            done();
            return res.json(results);
        });

    });

});


// Update post
router.put('/api/posts/:post_id', function(req, res) {

    var results = [];

    // Grab data from the URL parameters
    var id = req.params.post_id;
    var updateDate = new Date();

    var data = {title: req.body.title, draft: req.body.draft, author: req.body.author, updated: updateDate};

    pg.connect(connectionString, function(err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).send(json({ success: false, data: err}));
        }

        client.query("UPDATE posts SET title=($1), author=($2),  draft=($3), updated=($4) WHERE id=($5)", [data.title, data.author, data.draft, updateDate, id]);

        var query = client.query("SELECT * FROM posts ORDER BY id ASC");

        query.on('row', function(row) {
            results.push(row);
        });

        query.on('end', function() {
            done();
            return res.json(results);
        });
    });

}); 

// Delete post
router.delete('/api/posts/:post_id', function(req, res) {

    var results = [];
    var id = req.params.post_id;

    pg.connect(connectionString, function(err, client, done) {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        client.query("DELETE FROM posts WHERE id=($1)", [id]);

        var query = client.query("SELECT * FROM posts ORDER BY id ASC");

        query.on('row', function(row) {
            results.push(row);
        });

        query.on('end', function() {
            done();
            return res.json(results);
        });
    });

}); 

module.exports = router;
