const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_CONNECTION, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err)
        throw err;
    console.log("Mongo is Working");
});

module.exports = mongoose;