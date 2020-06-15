const mongoose=require('mongoose');

const tasksSchema=new mongoose.Schema({
    content:{type:String, required:true},
    category:{type:String,required:true},
    date:{ type:String, required:true},
}
,
{timestamps:true}
//this is to keep note of when user modified or created data
);
const Task=mongoose.model('Task',tasksSchema);
module.exports=Task;