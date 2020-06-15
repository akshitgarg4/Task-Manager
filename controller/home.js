const User=require('../models/user');
const Task=require('../models/task');
const passport=require('passport');
module.exports.home_page=function(req,res)
{
    //so that after logged in user don't see this page
    if(req.isAuthenticated())
    {
        return res.redirect('/main');
    }
    return res.render('signup',{title:"Task Manager | Sign Up"});
}


//after sign up user has to login to enter the main page where he can add tasks
module.exports.login=function(req,res)
{
    User.findOne({email:req.body.email},function(error,user)
    {
        if(error)
        {
            console.log("Error in finding user from db");
            return res.render('signup',{title:"Task Manager | Sign Up"});

        }
        if(user)
        {
            return res.render('signup',{title:"Task Manager | Sign Up"});

        }
        if(!user)
        {
            User.create(req.body,function(err,use)
            {
                if(err)
                {
                    console.log("error in writing in db");
                    return;
                }
                else{
                    return res.render('login',{title:"Task Manager | LOGIN"});
                }

            });
        }
    });
}

//to login directly if he has already signed up
module.exports.login2=function(req,res)
{
    //so that after logged in user don't see this page
    if(req.isAuthenticated())
    {
        return res.redirect('/main');
    }
    return res.render('login',{title:"Task Manager | LOGIN"});
    
}

//once the user logins a session would be created 
module.exports.user=function(req,res)
{
    
    return res.redirect('/main');
    
}

//logout function
module.exports.enduser=function(req,res)
{
    req.logout();
    return res.redirect('/');
}

//load the main page
module.exports.main_page=function(req,res)
{
    
   User.findById(req.user._id).populate('tasks').exec(function(error,ans)
   {
       if(error)
       {
           console.log("error in poulating");
       }
       return res.render('main',{title:"TASK MANAGER",tasks:ans});

   })

    
}

//to delete the task selected bu user
module.exports.deletetask=function(req,res)
{
    let id=req.params.id;
    Task.findByIdAndDelete(id,function(error)
    {
        if(error)
        {
            console.log("error in deleting from db");
            return;
        }
    })
    
    return res.redirect('back');
}


//add task in task db
module.exports.create=function(req,res)
{
    User.findById(req.body.id,function(error,user)
    {
        if(error)
        {
            console.log("Error in finding user from db");
            return res.redirect('back');

        }
        if(user)
        {
            
            Task.create({
                content:req.body.content,
                category:req.body.category,
                date:req.body.date
            },function(err,task)
            {
                if(err)
                {
                    console.log("error in writing in task db");
                }
                user.tasks.push(task);
                user.save();
                return res.redirect('back');
            })

        }
        if(!user)
        {
            User.create(req.body,function(err,use)
            {
                if(err)
                {
                    console.log(req.body);
                    console.log("error in writing in db");
                    return;
                }
                else{
                    return res.render('login',{title:"Task Manager | LOGIN"});
                }

            });
        }
    });
}
