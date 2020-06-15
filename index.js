const express=require('express');
const port=8000;
const app=express();

//to link models with this file
const db=require('./config/mongoose');

//cookie-parser
const cookieParser=require('cookie-parser');

//to use layouts and css
const expressLayout=require('express-ejs-layouts');

//linking main index.js and passport.js in config
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport');

//to store session permanently
const MongoStore=require('connect-mongo')(session);
app.use(session({
    name:'Task Manager',
    secret:'blahesomething',
    saveUninitialized:false,
    resave:false,
    cookie:{maxAge:(1000*60*100)},
    store:new MongoStore({
        mongooseConnection:db,
        autoRemove:'disabled'
    },function(err){

    if(err)
    {
        console.log("error in storing session");
    }
    else
    {
        console.log("ok");
    }})
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);




//to get form data without encryption
app.use(express.urlencoded());

app.use(cookieParser());
//to use the layout
app.use(expressLayout);
//to use styles
app.use(express.static('./assets'));

app.set('layout extractStyles',true);


//to use views and ejs
app.set('view engine','ejs');
app.set('views','./views');







//to call routes index.js
app.use('/',require('./routes/index'));

app.listen(port,function(error)
{
    if(error)
    {
        console.log("Error in starting server");
    }
    else
    {
        console.log("Server successfully started");
    }
})