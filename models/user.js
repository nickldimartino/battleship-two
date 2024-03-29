const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    googleId: {
      type: String,
      required: true
    },
    email: String,
    avatar: String,
    gamesPlayed: {
      type: Number,
      default: 0
    },
    score: {
      type: Number,
      default: 0
    },
    wins: {
      type: Number,
      default: 0
    },
    losses: {
      type: Number,
      default: 0
    }, 
  }, {
    timestamps: true
  });
  

module.exports = mongoose.model('User', userSchema);
