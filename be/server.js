const express = require('express');
const PORT =5000;
const app = express();
const cors = require('cors');
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
require('./models/order_model');
require('./models/product_model');

app.use(cors());
app.use(express.json());

app.use(require('./routes/user_route'));
app.use(require('./routes/order_route'));
app.use(require('./routes/product_route'));
app.use(require('./routes/file_route'));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}!`);
});