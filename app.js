const express=require('express');
const ejsMate=require('ejs-mate');
const path=require('path');
const mongoose=require('mongoose');
const Plants=require('./models/plants');

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

app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.render('home');
})


app.get('/plants',async(req,res)=>{
    const plants=await Plants.find();
    res.render('plants/index',{plants});
})

app.post('/plants',async(req,res)=>{
    const plant=new Plants(req.body.plant);
    await plant.save();
    res.redirect(`/plants/${plant._id}`);
})

app.get('/plants/new',async(req,res)=>{
    res.render('plants/new');
})


app.get('/plants/:id',async(req,res)=>{
    const {id}=req.params;
    const plant=await Plants.findById(id);
    res.render('plants/show',{plant});
})



app.listen(3000,()=>{
    console.log('Serving on port 3000');
})