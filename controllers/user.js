let User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const insert = (user, handle) => {
    user.password = bcrypt.hashSync(user.password, 10);
    let u = new User(user);
    u.save(handle);
};

const login = async(user, handle) => {
    let res = null;
    await User.findOne({ email: user.email }, (err, userDb) => {
        if (err)
            return { ok: false, err };

        if (!userDb)
            return false;

        if (!bcrypt.compareSync(user.password, userDb.password))
            return false;

        return userDb;
    }).then((result) => {
        if (!result)
            return res = { ok: false, err: 'Usuario o contraseña incorrectos' };
        let token = jwt.sign({
            user: result,
        }, process.env.TOKEN_SEED, { expiresIn: process.env.TOKEN_EXPIRE });

        res = {
            ok: true,
            user: result,
            token
        };
    }).catch(err => {
        res = err;
    });
    return res;
}

module.exports = {
    insert,
    login
}