const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors(), express.json());

app.get('/', (req, res) =>
    res.json({success: true, message: 'Server is running'})
);

module.exports = app;



