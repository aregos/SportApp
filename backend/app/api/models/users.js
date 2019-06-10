const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Define a schema

const UserSchema = mongoose.Schema(
    {
    login: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        require: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
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
    gender: {
        type: Boolean
    },
    settingsList: {
        type: [String]
    }
    },
);

//hash user password before saving to database
UserSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

module.exports = mongoose.model('User', UserSchema,'users');