const Post = require('../models/post');

const get = (opts, handle) => {
    Post.find(opts.filter)
        .skip(opts.from)
        .limit(opts.limit)
        .exec(handle);
    return;
};

const count = (opts, handle) => {
    Post.countDocuments(opts.filter, handle);
};

const insert = (post, handle) => {
    try {
        let t = new Post(post);
        t.save(handle);
        return;
    } catch (err) {
        return err;
    }
};

const remove = (post, handle) => {
    try {
        Post.findById(post._id, (err, postDb) => {
            if (!err) {
                if (postDb.user == post.user)
                    postDb.remove(handle);
                return
            }
            return err;
        });
    } catch (err) {
        return err;
    }
}


module.exports = {
    get,
    insert,
    count,
    remove
}