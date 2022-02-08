const express=require('express');
const ejsMate=require('ejs-mate');
const path=require('path');
const mongoose=require('mongoose');
const session=require('express-session');
const flash=require('connect-flash')
const methodOverride=require('method-override');
const ExpressError = require('./utils/ExpressError');


const plantRoutes=require('./routes/plants');
const reviewRoutes=require('./routes/reviews');


const dbUrl='mongodb://localhost:27017/ashish-nursery';
mongoose.connect(dbUrl)
.then(()=>{
    console.log("CONNECTION OPEN")
})
.catch(err=>{
    console.log("OH NO ERROR!!!!!")
    console.log(err);
})


const app=express();


app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')));

const sessionConfig={
    secret:"thisisnotmysecret",
    resave:false,
    saveUninitialized:true,
}

app.use(session(sessionConfig));
app.use(flash());


app.use((req,res,next)=>{
   
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    return next();
})





app.use('/plants',plantRoutes);
app.use('/plants/:id/reviews',reviewRoutes);

app.get('/',(req,res)=>{
   res.render('home');
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