const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const requiredMsg = 'Este campo es requerido.';

const postSchema = new Schema({
    title: {
        type: String,
        required: ['true', requiredMsg],
    },
    content: {
        type: String,
        required: ['true', requiredMsg],
    },
    date: {
        type: Date,
        required: ['true', requiredMsg]
    },
    image: {
        type: String,
        required: ['true', requiredMsg],
    },
    user: {
        type: String,
    }
});

module.exports = mongoose.model('posts', postSchema);