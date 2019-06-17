const mongoose = require('mongoose');

const ChatSchema = mongoose.Schema({
    nickName: String,
    message: String,
    created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('chat', ChatSchema, 'chats');