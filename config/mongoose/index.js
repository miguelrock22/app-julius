const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndexes:true
}, err => {
    if (err){
        console.log(err)
        throw err;
    }
    console.log("Mongo is Working");
});

module.exports = mongoose;