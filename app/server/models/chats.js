const mongoose = require('mongoose');

const ChatsSchema = new mongoose.Schema({
    user_send: String,
    chat_log: Object,
    user_rec: String,
});

ChatsSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) this.created_at = currentDate;
    next();
});

const Chats = mongoose.model('Chats', ChatsSchema);

module.exports = Chats;
