const mongoose = require('mongoose');
const User = require('./User');

const uri = process.env.DATABASE_URL || "mongodb+srv://NHL-API:jFMyPGDfwjIhZLZS@cluster0-nq4cc.gcp.mongodb.net/nhlDB?retryWrites=true&w=majority"

const connectDb = () => {
    return mongoose.connect(uri);
}
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

module.exports = {
    connectDb,
    models: {
        User
    }
}
