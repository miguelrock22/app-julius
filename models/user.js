const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const uniqueValidator = require('mongoose-unique-validator');
const user = require('../controllers/user');

const requiredMsg = 'Este campo es requerido.';

const userSchema = new Schema({
    name: {
        type: String,
        required: ['true', requiredMsg]
    },
    email: {
        type: String,
        required: ['true', requiredMsg],
        unique: true
    },
    password: {
        type: String,
        required: ['true', requiredMsg]
    },
});

//Remove password from response
userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

userSchema.plugin(uniqueValidator, {
    message: '{PATH} ya existe.'
});

module.exports = mongoose.model('users', userSchema);