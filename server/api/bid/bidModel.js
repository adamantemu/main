var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BidSchema = new Schema({
  price: {
    type: String
  },

  description: {
    type: String
  },

  chosen: {
    type: String, // three types: [pending, chosen, notChosen]
    default: 'pending'
  },

  author: {type: Schema.Types.ObjectId, ref: 'user'},

  job: {type: Schema.Types.ObjectId, ref: 'post'}
},
{
  timestamps: { createdAt: 'created_at' }
});

module.exports = mongoose.model('bid', BidSchema);
