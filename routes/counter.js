
get = (req, res, next) => {
    req.models.Counter.find().then((counts) => {
      return res.send(counts);
    }).catch((error) => {
      next(error)
    })
}

getById = (req, res, next) => {
  req.models.Counter.findOne({id: req.params.id}).then((user) => {
    return res.send(user);
  })
}


put = (req, res, next) => {
  const plusOrMinus = req.body.count;
    req.models.Counter.findOneAndUpdate({
      id: req.body.id
      },
      {
        id: req.body.id,
        $inc: {count: plusOrMinus},
        $push: {"likedPlayers.playerId" : req.body.id }
      },
      {
        new: true,
        upsert: true,
        runvalidators: true,
      }).then((status) => {
        if (status.upserted)
          res.status(201)
        else if (status.nModified)
          res.status(200)
        else
          res.status(204)
      res.send()
      }).catch((error) => next(error))

}


module.exports = {
  get,
  put,
  getById
}
