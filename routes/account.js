dotify = require('node-dotify');

get = (req, res, next) => {
    var query;
    if (req.query.name) {
        query = req.models.Account.findOne({ "account.name": req.query.name })
    }
    else {
        query = req.models.Account.find()
    }

    query.exec().then((account) => {
        return res.send(account);
    }).catch((error) => next(error))
}

post = (req, res, next) => {
    req.models.Account.create({
        account: {
            name: req.body.account.name,
        }
    }).then((account) => {
        return res.status(201).send(account);
    }).catch((error) => {
        next(error);
    })
}

getById = (req, res, next) => {
    req.models.Account.findById(req.params.id).then((account) => {
        return res.send(account);
    }).catch((error) => next(error))
}

deleteById = (req, res, next) => {
    req.models.Account.findByIdAndDelete(req.params.id).then((deleted) => {
        if (deleted)
            return res.send(deleted).status(200)
        res.sendStatus(204)
    }).catch((error) => next(error))
}

patch = (req, res, next) => {
    req.models.Account.findByIdAndUpdate(req.params.id,
        {
            $set: dotify(req.body)
        },
        {
            returnNewDocument: true,
        }).then((account) => {
            console.log(account)
            res.send(account)
        }).catch((error) => next(error))
}

module.exports = {
    get,
    post,
    getById,
    deleteById,
    patch
}