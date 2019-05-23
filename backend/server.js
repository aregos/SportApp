const express      = require('express');
const logger       = require('morgan');
const users        = require('./app/routes/users');
const MongoClient  = require('mongodb').MongoClient;
const mongoose     = require('mongoose');
const bodyParser   = require('body-parser');
const db           = require('./app/api/config/db');
const app          = express();
const cors         = require('cors');
const jwt          = require('jsonwebtoken');
const port         = 8000;

app.set('secretKey', 'nodeRestApi');
//app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended : true }));

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, application/x-www-form-urlencoded');
//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//         return res.status(200).json({});
//     }
//     next();
// })
app.use(cors());
app.use('/users', users);
mongoose.connect(db.url, {dbName: 'data'}).then(() => console.log('success'), err => console.log(err));
mongoose.Promise = global.Promise;

app.get('/', (req, res) => res.send('Hello World!'));


app.listen(port, () => console.log('app is running on port ' + port));