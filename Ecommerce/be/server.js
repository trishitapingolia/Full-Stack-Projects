const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const paypal = require('paypal-rest-sdk');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

global.__basedir = __dirname;

mongoose.connect(MONGODB_URL);

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': CLIENT_ID,
    'client_secret': CLIENT_SECRET
  });

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
app.use(require('./routes/paypal_route'));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}!`);
});