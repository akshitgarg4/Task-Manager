const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/task-manager');

const db=mongoose.connection;

db.on('error',console.error.bind(console,"Error in creating Mongoose Server"));
db.once('open',function(){
    console.log("Successful Connection with mongoose Server");
});

module.exports=db;