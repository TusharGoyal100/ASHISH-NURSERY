const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const PlantSchema=new Schema({
   title:String,
   image:String,
   price:Number,
   description:String,
   reviews:[{
      type:Schema.Types.ObjectId,
      ref:'Review'
   }]
});


module.exports=mongoose.model('Plants',PlantSchema);