const Plants=require('../models/plants');
const Review=require('../models/review');


module.exports.createReview=async(req,res)=>{
    const plant=await Plants.findById(req.params.id);
    const review=await new Review(req.body.review);
    plant.reviews.push(review);
    await review.save();
    await plant.save();
    res.redirect(`/plants/${plant._id}`);
}

module.exports.deleteReview=async(req,res)=>{
    const {id,reviewId}=req.params;
    await Plants.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/plants/${id}`);
}