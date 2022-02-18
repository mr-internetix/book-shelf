// IMPORTS 

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const findRemoveSync = require('find-remove')

// deleting files in 1 hours  
setInterval( function ajit(){
    findRemoveSync('./book', {age: {seconds: 3600}, extensions:['.jpg','.png'], limit: 100})
}
,3600)


//  auth related imports 

const cookieParser = require("cookie-parser");

const csrf = require("csurf");

const bodyParser = require("body-parser");

const csrfMiddleware = csrf({cookie: true});

// firebase configs 

var admin = require("firebase-admin");

var serviceAccount = require("./bookshelf.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});



//cors config

const cors = require("cors")

var corsOptions = {
  origin: "http://localhost:3000"  };


app.use(cors(corsOptions));

// IMPORTING DATABASE CONNECTION 

const connect_database = require('./config/db_config');
const multer = require('multer');



// SETTING PUBLIC TO STATIC ROUTE 

app.use('/static',express.static('public'))

// setting view engine 
// template engine 

app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs');


// CONNECTING DATABASE

connect_database();

// middlewares


app.use(bodyParser.json());
app.use(cookieParser());
app.use(csrfMiddleware);


// MANAGING ROUTES 
app.all("*", (req, res, next) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    next();
});


app.get('/',(req,res)=>{
    res.render(path.join(__dirname+'/views/home.ejs'))
})



app.use('/sell',require('./routes/sell.js'))


// buy  route  route
app.use('/buy',require('./routes/buy.js'))

app.get('/login',(req,res)=>{
    res.render(path.join(__dirname+'/views/login.ejs'))
})


// book upload route 

app.use('/api/bookupload',require('./routes/bookUpload'));


// user login routes 


app.post("/sessionLogin", (req, res) => {

    const idToken = req.body.idToken.toString();
 
    const expiresIn = 60*60*24*5*1000;
    admin
    .auth()
    .createSessionCookie(idToken,{expiresIn})
    .then(
        (sessionCookie) =>{
        const options = {maxAge:expiresIn, httpOnly:true};
        res.cookie("session",sessionCookie,options);
        res.end(JSON.stringify({status:"success"}));
        },
        (error)=>{
            res.status(401).send("unauthorised access");
        });
    
});


app.get("/sessionLogout",(req,res)=>{
    res.clearCookie("session");
    res.redirect("/")
});

// create account route 

app.use('/createaccount',require('./routes/create_account.js'))


// your ads

app.use('/yourads',require('./routes/your_ads.js'));

// deleting post 

app.use('/delpost',require('./routes/delPost.js'));


// deatiled book details route


app.use('/buybook',require('./routes/buy_book.js'))









// LISTENING ON SOME PORTS 
app.listen(PORT,()=>{
    console.log(`the app is running on http://localhost:${PORT}`)
})
