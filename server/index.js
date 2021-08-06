const express = require("express");
const cors = require("cors");

const app = express();

const userRouter = require('./routes/userRoutes');

app.use(cors(), express.json());

app.get('/', (req, res) =>
    res.json({success: true, message: 'Server is running'})
);

// http://localhost:9000/api/users/setProfilePic
app.use('/api/users', userRouter)

module.exports = app;



