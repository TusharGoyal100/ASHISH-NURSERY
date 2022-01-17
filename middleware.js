const {plantSchema,reviewSchema}=require('./schemas');
const ExpressError = require('./utils/ExpressError');




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