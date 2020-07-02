const express = require('express');
const _ = require('underscore');
const userController = require('../controllers/user');
const app = express();
const { verifyToken } = require('../middlewares/auth');

app.get('/api/user/check',verifyToken, (req, res) => {
    let body = req.body;
    res.json({ ok: true, user: req.user });
});

app.post('/api/login', (req, res) => {
    try {
        let body = req.body;
        if (_.isEmpty(body))
            return res.status(400).json({ ok: false, err: "Malformed POST request" });
        let response = userController.login(body);
        response.then(data => {
            if (!data.ok)
                return res.status(404).json(data);
            res.json(data);

        }).catch(err => {
            res.status(500).json({ ok: false, err });
        });
    } catch (err) {
        res.status(500).json({ ok: false, err });
    }
});

//Registrar usuario
app.post('/api/user', (req, res) => {
    try {
        let body = req.body;
        userController.insert(body, (err, userDb) => {
            if (err)
                return res.status(400).json({ ok: false, err });
            res.json({ ok: true, msg: 'Usuario agregado correctamente' });
        });
    } catch (err) {
        res.status(500).json({ ok: false, err });
    }
});

module.exports = app;