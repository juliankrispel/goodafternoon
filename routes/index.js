/*
 * GET home page.
 */
var _ = require('underscore');

exports.index = function(req, res, data){
    // res.render('index', { data : data });
    data.prevPost = data.blogPosts[1];
    res.render(data.blogPosts[0].url, { data : data});
    console.log(data);
};

exports.blog = function(req, res, data){
    var that_post = (_.find(data.blogPosts, 
        function(post){
            if(post.url.indexOf(req.params['id']) > -1){
                return post;
            }
        }));
    if(data.blogPosts[that_post.key + 1])
        that_post.prevPost = data.blogPosts[that_post.key +1];
    if(data.blogPosts[that_post.key - 1])
        that_post. nextPost = data.blogPosts[that_post.key -1];
    console.log(that_post);
    res.render(data.blogPath + req.params['id'], { data : that_post });
};