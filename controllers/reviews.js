const Plants=require('../models/plants');
const review = require('../models/review');
const Review=require('../models/review');


module.exports.createReview=async(req,res)=>{
    const plant=await Plants.findById(req.params.id);
    const review=await new Review(req.body.review);
    review.author=req.user._id;
    plant.reviews.push(review);
    await review.save();
    await plant.save();
    req.flash('success','Created new review!')
    res.redirect(`/plants/${plant._id}`);
}

module.exports.deleteReview=async(req,res)=>{
    const {id,reviewId}=req.params;
    await Plants.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId);
    req.flash('success','Successfully deleted review');
    res.redirect(`/plants/${id}`);
}