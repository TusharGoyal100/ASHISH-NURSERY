const express=require('express');
const ejsMate=require('ejs-mate');
const path=require('path');
const mongoose=require('mongoose');

const app=express();

const dbUrl=
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

app.get('/',(req,res)=>{
    res.render('home');
})




app.listen(3000,()=>{
    console.log('Serving on port 3000');
})