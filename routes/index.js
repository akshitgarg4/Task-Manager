const express=require('express');
const router=express.Router();

//passport.js
const passport=require('passport');

//controller
const homeController=require('../controller/home');


router.get('/',homeController.home_page);
router.get('/login2',homeController.login2);
router.post('/login',homeController.login);
router.post('/user',passport.authenticate('local',{failureRedirect:'/'}),homeController.user);
router.get('/main',passport.checkAuthentication,homeController.main_page);
router.get('/delete/:id',homeController.deletetask);
router.post('/task-input',homeController.create);
router.get('/end_user',homeController.enduser);

module.exports=router;