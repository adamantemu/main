var Post = require('../post/postModel');
var Bid = require('./bidModel'); 

var _ = require('lodash');
var logger = require('../../util/logger');

exports.params = function(req, res, next, id) {
  Bid.findById(id)
    .populate('author job')
    .exec()
    .then(function(bid) {
      if (!bid) {
        next(new Error('No bid with that id'));
      } else {
        req.bid = bid;
        next();
      }
    }, function(err) {
      next(err);
    });
};

exports.get = function(req, res, next) {
  Bid.find({})
    .populate('author job')
    .exec()
    .then(function(bids){
      res.json(bids);
    }, function(err){
      next(err);
    });
};

exports.getOne = function(req, res, next) {
  var bid = req.bid;
  res.json(bid);
};

exports.put = function(req, res, next) {
  var bid = req.bid;

  var update = req.body;

  // if (update.chosen === 'chosen') {
  //   // update
  // }

  _.merge(bid, update, function(a,b){
    if(_.isArray(a)) {
      return a.concat(b);
    }
  });

  bid.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  });
};

exports.post = function(req, res, next) {
  var newbid = req.body;
  // create bid
  Bid.create(newbid)
    .then(function(bid) {

      // handle updating of post
      
      // MyModel.findOneAndUpdate(query, req.newData, {upsert:true}, function(err, doc){
      //     if (err) return res.send(500, { error: err });
      //     return res.send("succesfully saved");
      // });


      Post.findById(bid.job)
        .exec()
        .then(function(post) {
          if (!post) {
            next(new Error('No post with that id'));
          } else {
            // update post with new bid id in bids
            post.bids.push(bid._id);
            post.save(function(err, saved) {
              if (err) {
                next(err);
              } else {
                //res.json(saved);
                res.json(bid);
              }
            });
          }
        }, function(err) {
          logger.error(err);
          next(err);
        });

      //send back bid to user
      //res.json(bid);

    }, function(err) {
      logger.error(err);
      next(err);
    });
};

exports.delete = function(req, res, next) {
  req.bid.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};