const mongoose = require('mongoose');
const User = require('./users');

const TeamSchema = mongoose.Schema({
    creator: User,
    chat: Chat
});

module.exports = mongoose.model('Team', TeamSchema, 'teams');