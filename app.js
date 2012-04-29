
/**
 * Module dependencies.
 */

var express = require('express'), 
    routes = require('./routes'),
    blog = require('./blog'),
    _ = require('underscore');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// General Data

app.data = {
    title : "The Site Title",
    blogPosts : blog.blogPosts(),
    blogPath : blog.path.replace('./views/',''),
    getPostID : function(){}
}

// Routes

app.get('/', function(req,res){
    routes.index(req,res,app.data);
});

app.get("/blog/:id?", function(req,res){
    routes.blog(req,res,app.data);
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);