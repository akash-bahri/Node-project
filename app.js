const express = require('express');
const session = require('express-session'); // Import the express-session middleware
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const app = express();
const port = 3001;
const oneDay = 1000 * 30;
const userRoutes = require('./controller/routes/userRoutes');
const mongoose = require('mongoose');
app.use(cors({ credentials: true, origin: "http://127.0.0.1:5501" }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Configure the express-session middleware
app.use(session({
    secret: '76597608687669757',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: oneDay, secure: false, httpOnly: true },
}));

//----------------------------------------------------------


mongoose.connect('mongodb+srv://akashbahri90:wi5ULQterlZTWkaN@cluster0.u97s9sw.mongodb.net/Node');

// const surveySchema = new mongoose.Schema({
//     name: String,
//     age: Number,
//     color: String
// });
// const Survey = mongoose.model('Survey', surveySchema);

app.set('view engine', 'ejs');
app.use('/users',userRoutes);


const hostname = '127.0.0.1';

app.listen(port, hostname, () => console.log(`Example app listening on port http://${hostname}:${port}/`));