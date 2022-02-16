const {plantSchema,reviewSchema}=require('./schemas');
const ExpressError = require('./utils/ExpressError');
const ObjectId = require('mongoose').Types.ObjectId;



module.exports.validatePlant=(req,res,next)=>{
 
    const {error}=plantSchema.validate(req.body);
    if(error)
    {
         const msg=error.details.map(el=>el.message).join(',')
         throw new ExpressError(msg,400);
    }
   
   return next();
}
module.exports.validateReview=(req,res,next)=>{
 
     const {error}=reviewSchema.validate(req.body);
     if(error)
     {
          const msg=error.details.map(el=>el.message).join(',')
          throw new ExpressError(msg,400);
     }
    
    return next();
 }


 module.exports.validateId=(req,res,next)=>{
      const {id} =req.params;
      if(id)
      {
          if(!ObjectId.isValid(id))
          {
               req.flash('error','Cannot find that plant');
               return res.redirect('/plants'); 
          }
      }
      return next();
 }


 module.exports.isLoggedIn=(req,res,next)=>{
      if(!req.isAuthenticated()){
           req.flash('error','You must be signed in first!');
           return res.redirect('/login');
      }
      return next();
 }