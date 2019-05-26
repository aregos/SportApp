const express      = require('express');
const logger       = require('morgan');
const users        = require('./app/routes/users');
const MongoClient  = require('mongodb').MongoClient;
const mongoose     = require('mongoose');
const bodyParser   = require('body-parser');
const dbUrl        = require('./app/api/config/db');
const app          = express();
const cors         = require('cors');
const jwt          = require('jsonwebtoken');
const port         = 8000;


app.set('secretKey', 'nodeRestApi');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

app.use(cors());

app.use('/users', users);



app.listen(port, () => console.log('app is running on port ' + port));


mongoose.connect(dbUrl.url, {dbName: 'data'}).then(() => console.log('success'), err => console.log(err));
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));