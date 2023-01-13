const mongoose = require("mongoose")
const { Schema } = mongoose;

const UserSchema = new Schema({
  email:  String, // String is shorthand for {type: String}
  password: String,
  img: String
});
const User = mongoose.model('User',UserSchema)
module.exports = User