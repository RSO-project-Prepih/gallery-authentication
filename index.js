require('dotenv').config();
const express = require('express');

const app = express();
const port = 5000;

const usersApi = require('./routes/users');
const checkApi = require('./routes/check');

require('./models/db');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use("/auth", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
});

// root path
app.use('/auth', usersApi);

// check api - health, liveness, readiness
app.use('/check', checkApi);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})

module.exports = {
    app,
}
