const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const PlantSchema=new Schema({
   title:String,
   image:String
})


module.exports=mongoose.model('Plants',PlantSchema);