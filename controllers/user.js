const User=require('../models/user');
const ExpressError = require('../utils/ExpressError');

module.exports.renderRegister=(req,res)=>{
    res.render('users/register');
};

module.exports.register=async(req,res,next)=>{
    try{
    const {username,email,password}=req.body;
    if(!email)
    {
        throw new ExpressError('email is missing')
    }
    const user=new User({username,email});
    const newUser=await User.register(user,password);
    req.login(newUser,err=>{
        if(err)return next(err);
        req.flash('success','successfully registered');
        res.redirect('/plants');
    })
    }
    catch(e)
    {
        req.flash('error',e.message);
        res.redirect('register');
    }
}

module.exports.renderLogin=(req,res)=>{
    res.render('users/login');
}

module.exports.login=(req,res)=>{
    req.flash('success','successfully logged in');
    const redirectUrl=req.session.returnTo || '/plants';
    delete req.session.returnTo;
    res.redirect(redirectUrl);                                                                        
 }

 module.exports.logout=(req,res)=>{
    req.logout();
    req.flash('success',"successfully logged out");
    res.redirect('/plants');
}

