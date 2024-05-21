const express = require('express');
const dotenv= require('dotenv');

const app = express();
const cors = require('cors');
dotenv.config();
const PORT= process.env.PORT;

const mongoose = require('mongoose');
const {MONGODB_URL}= require('./config');

global.__basedir = __dirname;

mongoose.connect(MONGODB_URL);

mongoose.connection.on('connected', ()=>{
    console.log('Connected to MongoDB');
})

mongoose.connection.on('error', (err)=>{
    console.log('Error occurred while connecting');
})
require('./models/user_model');
require('./models/tweet_model');

app.use(cors());
app.use(express.json());

app.use("/api/tweet",require('./routes/tweet_route'));
app.use("/api/user",require('./routes/user_route'));
app.use("/api",require('./routes/file_route'));
app.use("/api/auth",require('./routes/authuser_route'));
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}!`);
});