const express = require("express");
const cors = require('cors');
const routes = require('./routes');
const db = require('./models');
const app = express();

// environment variable PORT or 3000 if unset
const port = process.env.PORT || 2000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({
  extended: true
}))

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  res.status(error.statusCode || error.status || 500).send({error: error })
})

app.use((req, res, next ) => {
  req.models = db.models
  next()
})
app.use("/", routes);


// Start up server and begin listen to requests
db.connectDb().then(() => {
  const listener = app.listen(port, () => {
    console.info(`Server is listening on port ${listener.address().port}.`);
  })
}).catch((error) => {
  console.error(error);
});
