const { string } = require('joi');
const mongoose=require('mongoose');
const Reviews=require('./review');
const Schema=mongoose.Schema;


const PlantSchema=new Schema({
   title:String,
   image:[
      {
         url:String,
         filename:String
      }
   ],
   price:Number,
   description:String,
   author:{
    type:Schema.Types.ObjectId,
    ref:'User'
   },
   reviews:[{
      type:Schema.Types.ObjectId,
      ref:'Review'
   }]
});

PlantSchema.post('findOneAndDelete',async function(doc){
   if(doc)
   {
      await Reviews.deleteMany({
         _id:{
            $in:doc.reviews
         }
      })
   }
})


module.exports=mongoose.model('Plants',PlantSchema);