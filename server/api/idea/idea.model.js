'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var IdeaSchema = new Schema({
  title: String,
  description: String,
  originator: {name:String, email: String},
  team: {
  	name: String,
  	members: [{name:String, email: String}]
  }
});

module.exports = mongoose.model('Idea', IdeaSchema);