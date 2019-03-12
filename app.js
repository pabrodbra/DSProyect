// Importing modules
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

const route = require('./routes/route');

// Port number
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/entertainmentminer', { useNewUrlParser: true });

mongoose.connection.on('connected', ()=>{
    console.log('Succesfully connnected to database mongodb @ 27017')
});

mongoose.connection.on('error', (err)=>{
    if(err) console.log('Error in database mongodb @ 27017 :: ' + err)
});

// Add Middleware - CORS
app.use(cors());

// Add body-parser
app.use(bodyparser.json());

// Static files
app.use(express.static(path.join(__dirname, 'public')))

// Routing
app.use('/api', route);

// Testing
app.get('/', (req,res)=>{
    res.send('foobar');
});

app.listen(port, function(){
    console.log('Server stated at port :: ' + port);
});
