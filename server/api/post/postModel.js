var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },

  text: {
    type: String,
    required: true
  },

  salary: {
    type: Number
  },

  chose: {
    type: String,
    default: 'pending'
  },

  // bids : {
  //   type: [{
  //     price : {
  //       type: String
  //     },
  //     description: {
  //       type : String
  //     }
  //   }],
  //   default: []
  // },

  //bids : [{type: Schema.Types.ObjectId, ref: 'bid'}],
  // author: {
  //   type: String
  // },

  // category: {
  //   type: String
  // }

  author: {type: Schema.Types.ObjectId, ref: 'user'},

  categories: [{type: Schema.Types.ObjectId, ref: 'category'}],

  bids: [{type: Schema.Types.ObjectId, ref: 'bid'}],
},
{
  timestamps: { createdAt: 'created_at' }
});

module.exports = mongoose.model('post', PostSchema);
