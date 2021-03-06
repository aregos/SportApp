const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const UserSchema = mongoose.Schema({
  login: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    required: true
  },
  name: {
    type: String,
    trim: true
  },
  surName: {
    type: String,
    trim: true
  },
  birthDate: {
    type: Date,
    trim: true
  },
  //0 - male, 1 - female
  gender: {
    type: Boolean
  },
  //list with activated user' settings
  settingsList: {
    type: Object
  },
  friends: [
    {
      id: {
        type: String,
        unique: true
      }
    }
  ],
  friendsOutRequests: {
    type: [String],
    unique: true
  },
  friendsInRequests: {
    type: [String],
    unique: true
  }
});

//hash user password before saving to database
UserSchema.pre("save", function(next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

module.exports = mongoose.model("User", UserSchema, "users");
