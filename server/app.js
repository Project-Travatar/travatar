const express = require ('express');
const path = require ('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser');

//use environmental variables
dotenv.config({ path: './.env' });

// connect to MongoDB cluster
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.VITE_MONGO_URI}`);
  } catch (err) {
    // console.error(err);
    process.exit(1);
  }
}

connectDB();

// TEST CODE - CAN DELETE WHEN FINISHED
// const tripController = require('./controllers/itinerary_controller');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.urlencoded({ extended: true })); //parse urlencoded bodies

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/trip', require('./routes/itineraryRoutes'));
app.use('/api/auth/google', require('./routes/googleOAuthRoutes'));

app.get('/api/getGplacesKey', (req, res) => {
  console.log('getKey:', process.env.GPLACES_API_KEY);
  res.send(process.env.GPLACES_API_KEY);
})


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname,'../index.html'))
})





module.exports = app;