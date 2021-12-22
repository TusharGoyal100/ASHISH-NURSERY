const mongoose=require('mongoose');
const plants=require('./plants');
const Plant=require('../models/plants');


const dbUrl='mongodb://localhost:27017/ashish-nursery';
mongoose.connect(dbUrl)
.then(()=>{
    console.log("CONNECTION OPEN")
})
.catch(err=>{
    console.log("OH NO ERROR!!!!!")
    console.log(err);
})

const seedDB=async()=>{
    for(let i=0;i<11;i++)
    {
       const plant=new Plant({
           title:`${plants[i].title}`,
           image:`${plants[i].image}`
       })

       await plant.save();
      
    }

}

seedDB().then(()=>{
    mongoose.connection.close();
})