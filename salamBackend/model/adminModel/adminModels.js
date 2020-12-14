var mongoose = require("mongoose");

var adminSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    require: true,
  },
});

var admin = mongoose.model("admin", adminSchema);

module.exports = admin;
