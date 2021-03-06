const express = require('express');
const postController = require('../controllers/post');
var formidable = require('formidable');
const app = express();
const s3 = require('../config/aws');

const { verifyToken } = require('../middlewares/auth');
const user = require('../models/user');
const { response } = require('./user');

//Get all posts
app.get('/api/post', verifyToken, (req, res) => {
    try {
        let opts = {
            from: Number(req.query.from) || 0,
            limit: Number(req.query.limit) || 10,
            filter: { user: req.user._id }
        }
        postController.get(opts, (err, postsDb) => {
            if (err)
                return res.status(400).json({ ok: false, err });
            postController.count(opts, (err, count) => {
                if (err)
                    return res.status(400).json({ ok: false, err });
                res.json({ ok: true, postsDb, count });

            });
        });
    } catch (error) {
        res.status(500).json({ ok: false, error });
    }
});

//insert a post
app.post('/api/post', verifyToken, (req, res) => {
    var form = new formidable.IncomingForm();
    let body = req.body;
    form.parse(req, function(err, fields, files) {
        s3.uploadFile(files.image,(s3Err, data) => {
            if (s3Err) throw s3Err
            body.title= fields.title;
            body.content= fields.content;
            body.date= fields.date;
            body.image = data.Location;
            body.user = req.user._id;
            postController.insert(body, (err, postDb) => {
                if (err)
                    return res.status(400).json({ ok: false, err });
                res.json({ ok: true, msg: 'Post agregado correctamente' });
            });
        });

    });
});

//delete a post

app.delete('/api/post/:id', verifyToken, (req, res) => {
    let user = req.user._id;
    let _id = req.params.id;
    postController.remove({ user, _id }, (err, postDb) => {
        if (err)
            return res.status(400).json({ ok: false, err });
        res.json({ ok: true, msg: 'Post eliminado correctamente' });
    });
});

module.exports = app;