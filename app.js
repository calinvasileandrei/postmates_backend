const express = require('express')

const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
require('dotenv/config');


//Middleweare
app.use(cors()); //for access-control-allow-origin

app.use(express.urlencoded({ extended: true }))
app.use(express.json());


//Import Routes
const restaurantsRoute = require('./routes/restaurant');
app.use('/restaurants', restaurantsRoute)

const categoryRoute = require('./routes/category');
app.use('/categories',categoryRoute)

const sectionRoute = require('./routes/section');
app.use('/sections',sectionRoute)

const productRoute = require('./routes/product');
app.use('/products',productRoute)

//ROUTES
app.get('/', (req,res)=> {
    res.send('We are on home');
});


//Connect to db
mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => console.log('connected to db'))
  .catch((err) => console.log(err))

//listening server
app.listen(3000);
