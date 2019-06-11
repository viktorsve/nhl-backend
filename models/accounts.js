mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    account: {
        name: String,
        
    }
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
