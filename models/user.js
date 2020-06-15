const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{type:String, required:true},
    email:{ type:String, required:true,unique:true},
    password:{type:String, required:true},
    tasks:[{type:mongoose.Schema.Types.ObjectId,ref:'Task'}]
}
,
{timestamps:true}
//this is to keep note of when user modified or created data
);
const User=mongoose.model('User',userSchema);
module.exports=User;