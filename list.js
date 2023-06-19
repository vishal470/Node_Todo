const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    title:
    {
        type: String,
        requried: true
    },
    description:
    {
        type: String,
        requried: true
    },
    completed: {
        type: Boolean,
        requried: true
    }
});

const List = mongoose.model('Todo', listSchema);

module.exports = List;
