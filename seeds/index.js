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
           image:`${plants[i].image}`,
           price:10,
           description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora perspiciatis saepe laboriosam quas atque, dolore culpa sunt illo veritatis? Nihil voluptatem officiis vitae ducimus neque hic omnis quidem amet praesentium."
       })

       await plant.save();
      
    }

}

seedDB().then(()=>{
    mongoose.connection.close();
})