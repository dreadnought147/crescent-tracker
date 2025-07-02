// Main entry point of our app
const express = require("express")
const session = require('express-session');
const path = require('path');
const db = require('./db');
const issueRoute = require('./routes/issueRoutes');
const adminRoute = require('./routes/adminRoutes');
const authRoute = require('./routes/authRoutes')
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

//Middleware
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended : true}));
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false
}));

//Routes
app.use('/', authRoute);
app.use('/', issueRoute);
app.use('/admin',adminRoute)

app.listen(PORT, ()=>  {
    console.log('server is running on port ', PORT)
});