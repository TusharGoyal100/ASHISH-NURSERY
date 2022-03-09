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
    await Plant.deleteMany({});
    for(let i=0;i<11;i++)
    {
       const plant=new Plant({
           title:`${plants[i].title}`,
           image:[{
            url: 'https://res.cloudinary.com/dy1lw8otu/image/upload/v1646792505/Plant/nbymibpho5rivzpc9osu.jpg',
            filename: 'Plant/nbymibpho5rivzpc9osu'
          },
          {
            url: 'https://res.cloudinary.com/dy1lw8otu/image/upload/v1646792505/Plant/ecdxrafaifoafb1skzan.jpg',
            filename: 'Plant/ecdxrafaifoafb1skzan'
          }
      ],
           price:10,
           description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora perspiciatis saepe laboriosam quas atque, dolore culpa sunt illo veritatis? Nihil voluptatem officiis vitae ducimus neque hic omnis quidem amet praesentium.",
           author:'620daeefe5cd33f86f70919c'
        })

       await plant.save();
      
    }

}

seedDB().then(()=>{
    mongoose.connection.close();
})