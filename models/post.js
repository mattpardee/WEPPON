var markdown = require(__dirname + '/../public/js/markdown/markdown.js')

// Fake data store

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
  fn();
};

Post.prototype.validate = function(fn){
  if (!this.title) return fn(new Error('_title_ required'));
  if (!this.body) return fn(new Error('_body_ required'));
  this.rendered_body = markdown.toHTML(this.body);
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