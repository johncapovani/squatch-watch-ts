//DEPENDENCIES
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5001;


//MIDDLEWARE    
app.use(cors());
//allows to parse json
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

//Bring in errorHandler
const { errorHandler } = require('./middleware/errorMiddleware')

//Connect to Database
const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
//once runs a function only one time: in this case, the console.log after the connection is established
connection.once('open', () => {
    console.log('MongoDB db connection established.')
})

//CONTROLLERS
app.use('/api/sightings', require('./routes/sighting_routes'))
app.use('/api/users', require('./routes/user_routes'))

//Set the app to use our errorHandler
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});