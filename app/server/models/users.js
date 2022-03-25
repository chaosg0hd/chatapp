const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
  
  username: String,
  password: String,

  lname: String,
  fname: String,
  mname: String,
  extname: String,

  imgURL: String,

  //start_Date: Date,
  //birth_Date: Date,
  
  /*role: Number,*/

  /*isArchive: Number,*/

  created_at: Date,
  updated_at: Date,

  number: Number,
  contact_list: Object

});

UsersSchema.pre('save', function (next) {
  var currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at) this.created_at = currentDate;
  next();
});

const Users = mongoose.model('Users', UsersSchema);

module.exports = Users;
