const express=require('express');
const router=express.Router({mergeParams:true});
const {validateReview,validateId,isLoggedIn}=require('../middleware');
const catchAsync=require('../utils/catchAsync');
const reviews=require('../controllers/reviews')


router.post('/',validateReview,validateId,isLoggedIn,catchAsync(reviews.createReview))

router.delete('/:reviewId',validateId,catchAsync(reviews.deleteReview))

module.exports=router;