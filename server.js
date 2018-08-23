const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const {port, db} = require('./config');
const router = require('./router');



const app = express();

//Setting up port & MongoDB-Connection
mongoose.connect(db);


app.use(bodyParser.json({type: '*/*'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(morgan('combined'));

app.enable('trust proxy');

//Setting up routes
router(app);


//Running the server
app.listen(port, () => {
   console.log(`http://localhost:${port}`);
   console.log('CARL_Server started');
   console.log('Now listening')
});
