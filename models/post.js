var fs = require("fs")
  , markdown = require(__dirname + '/../public/js/markdown/markdown.js')
  , weppontools = require(__dirname + '/../public/js/weppontools.js');

// Fake data store
//@TODO REMOVE THIS
var ids = 0
  , db = {};

var Post = exports = module.exports = function Post(title, body) {
  this.id = ++ids;
  this.title = title;
  this.body = body;
  this.createdAt = new Date;
};

Post.prototype.save = function(fn){
  db[this.id] = this;
  var new_dir = __dirname + "/../articles/" + this.rendered_title;
  var _self = this;
  fs.mkdir(new_dir, 0774, function(err) {
    if (err) {
        return fn(new Error('Error creating directory: ' + err));
    }
    
    else {
      fs.writeFile(new_dir + '/article.md', _self.body, function(err) {
        if(err) {
            return fn(new Error('Error writing file: ' + err));
        } else {
            fn();
        }
      });
    }
  });
};

Post.prototype.validate = function(fn){
  if (!this.title) return fn(new Error('_title_ required'));
  if (!this.body) return fn(new Error('_body_ required'));
  this.rendered_body = markdown.toHTML(this.body);
  this.rendered_title = weppontools.normalizeURL(this.title.toLowerCase());
  fn();
};

Post.prototype.update = function(data, fn){
  this.updatedAt = new Date;
  for (var key in data) {
    if (undefined != data[key]) {
      this[key] = data[key];
    }
  }
  this.save(fn);
};

Post.prototype.destroy = function(fn){
  exports.destroy(this.id, fn);
};

exports.count = function(fn){
  fn(null, Object.keys(db).length);
};

exports.all = function(fn){
  var arr = Object.keys(db).reduce(function(arr, id){
    arr.push(db[id]);
    return arr;
  }, []);
  fn(null, arr);
};

exports.get = function(id, fn){
  fn(null, db[id]);
};

exports.destroy = function(id, fn) {
  if (db[id]) {
    delete db[id];
    fn();
  } else {
    fn(new Error('post ' + id + ' does not exist'));
  }
};