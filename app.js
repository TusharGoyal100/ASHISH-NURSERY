const express=require('express');
const ejsMate=require('ejs-mate');
const path=require('path');
const mongoose=require('mongoose');
const Plants=require('./models/plants');
const Review=require('./models/review')
const methodOverride=require('method-override');
const ExpressError = require('./utils/ExpressError');
const catchAsync=require('./utils/catchAsync');
const {validatePlant,validateReview}=require('./middleware')

const app=express();

const dbUrl='mongodb://localhost:27017/ashish-nursery';
mongoose.connect(dbUrl)
.then(()=>{
    console.log("CONNECTION OPEN")
})
.catch(err=>{
    console.log("OH NO ERROR!!!!!")
    console.log(err);
})

app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    res.render('home');
})




app.get('/plants',catchAsync(async(req,res)=>{
    const plants=await Plants.find();
    res.render('plants/index',{plants});
}))

app.post('/plants',validatePlant,catchAsync(async(req,res)=>{

    const plant=new Plants(req.body.plant);
    await plant.save();
    res.redirect(`/plants/${plant._id}`);
}))

app.get('/plants/new',async(req,res)=>{
    res.render('plants/new');
})


app.get('/plants/:id',catchAsync(async(req,res)=>{
    const {id}=req.params;
    const plant=await Plants.findById(id).populate('reviews');
    res.render('plants/show',{plant});
}))

app.put('/plants/:id',validatePlant,catchAsync(async(req,res)=>{
    const {id}=req.params;
    const plant=await Plants.findByIdAndUpdate(id,{...req.body.plant});
    await plant.save();
    res.redirect(`/plants/${plant._id}`);
}))

app.delete('/plants/:id',catchAsync(async(req,res)=>{
    const {id}=req.params;
    await Plants.findByIdAndDelete(id);
    res.redirect('/plants');
}))

app.get('/plants/:id/edit',catchAsync(async(req,res)=>{
    const {id}=req.params;
    const plant=await Plants.findById(id);
    res.render('plants/edit',{plant});
}))

app.post('/plants/:id/reviews',validateReview,catchAsync(async(req,res)=>{
    const plant=await Plants.findById(req.params.id);
    const review=await new Review(req.body.review);
    plant.reviews.push(review);
    await review.save();
    await plant.save();
    res.redirect(`/plants/${plant._id}`);
}))

app.delete('/plants/:id/reviews/:reviewId',async(req,res)=>{
    const {id,reviewId}=req.params;
    await Plants.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/plants/${id}`);
})


app.all('*',(req,res,next)=>{
    next(new ExpressError('Page Not Found',404));
})


app.use((err,req,res,next)=>{
    const {statusCode=500}=err;
    if(!err.message)err.message='OH No,Something Went Wrong'
    res.status(statusCode).render('error',{err});
})

app.listen(3000,()=>{
    console.log('Serving on port 3000');
})