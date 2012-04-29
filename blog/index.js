// Module Dependencies
var fs  = require("fs"),
    events = require("events"),
    Buffer = require('buffer').Buffer;

//Standard Path to Blog Posts
exports.path = './views/blog/';

exports.setPath = function(path){
    exports.path = path;
}

exports.blogPosts = function(blogPath){
    var posts = [];

    var i = 0;
    var readHead = function(file){
        var paramReg = /\/\/-\s*(\w*)\s*:\s*(.+)/g;
        var result;
        var fileOpened = fs.openSync(file, 'r');
        var fileRead = fs.readSync(fileOpened, 200, 0, 'utf8');

        posts[i] = {};

        while(result = paramReg.exec(fileRead.toString())){
            posts[i][result[1]] = result[2];
        }
        posts[i]['url'] = file.replace('./views/','');
        posts[i].id = i;
        i++;
    }

    var sortByDate = function(array, order){
        if(order === "asc"){
            array.sort(function(b,a){
                var dateA=new Date(a.Date), dateB=new Date(b. Date);
                return dateA-dateB; //sort by date ascending
            });
        }else{
            array.sort(function(a, b){
                var dateA=new Date(a.Date), dateB=new Date(b. Date);
                return dateA-dateB; //sort by date ascending
            });
        }
        return array;
    }

    var listBlog = function(files){
        files.forEach(function(file){
            readHead(exports.path+file);
        });
        var sortedPosts = sortByDate(posts, "asc");
        
        //Add keys so I can reference them later
        for (var i = 0; i < sortedPosts.length; i++) {
            sortedPosts[i].key = i;
        }
        return sortedPosts;
    }

    var init = function(folder){
        if(folder == null){
            folder = './views/blog/';
        }
        var files = fs.readdirSync(folder);
        return listBlog(files);
    }

    //Initialize blogPosts()
    return init(exports.path);
}
