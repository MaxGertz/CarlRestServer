const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRouter = require('./routes/userRouter');
const ticketRouter = require('./routes/ticketRouter');
const carparkRouter = require('./routes/carparkRouter');

const app = express();

//Setting up port & MongoDB-Connection
const port = process.env.PORT || 5656;
const db = mongoose.connect('mongodb+srv://Max:password001@carlcluster0-kgmq2.mongodb.net/Testing_Curl_DB_01');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

//Setting up routes
app.use('/api/user', userRouter);
app.use('/api/ticket', ticketRouter);
app.use('/api/carpark', carparkRouter);


//Running the server
app.listen(port, () => {
   console.log(`http://localhost:${port}`);
   console.log('CARL_Server started');
   console.log('Now listening')
});
