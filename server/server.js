const mongoose = require('mongoose');
const app = require('./index');
require('dotenv').config();

app.listen(9000, () => console.log('Server is running on port 9000!'));

// Establish database connection
mongoose
    .connect(process.env.MONGO_CONNECTION_STRING, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => console.log('DB connection successful!'))
    .catch(() => console.log('Error connecting DB!'));
