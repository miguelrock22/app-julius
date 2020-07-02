const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true
}, err => {
    if (err)
        throw err;
    console.log("Mongo is Working");
});

module.exports = mongoose;