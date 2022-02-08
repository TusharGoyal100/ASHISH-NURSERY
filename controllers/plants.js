const Plants=require('../models/plants');
const ObjectId = require('mongoose').Types.ObjectId;



module.exports.index=async(req,res)=>{
    const plants=await Plants.find();
    res.render('plants/index',{plants});
};

module.exports.createPlants=async(req,res)=>{

    const plant=new Plants(req.body.plant);
    await plant.save();
    req.flash('success','successfully added a plant');
    res.redirect(`/plants/${plant._id}`);
}


module.exports.renderNewForm=(req,res)=>{
    res.render('plants/new');
}

module.exports.showPlants=async(req,res)=>{
    const {id}=req.params;
    let plant;
    if(ObjectId.isValid(id))
    {plant=await Plants.findById(id).populate('reviews');}
    if(!plant)
    {
        req.flash('error','Cannot find that plant');
        return res.redirect('/plants');
    }
    res.render('plants/show',{plant});
}

module.exports.updatePlants=async(req,res)=>{
    const {id}=req.params;
    const plant=await Plants.findByIdAndUpdate(id,{...req.body.plant});
    await plant.save();
    req.flash('success','successfully updated a plant information');
    res.redirect(`/plants/${plant._id}`);
}

module.exports.deletePlants=async(req,res)=>{
    const {id}=req.params;
    await Plants.findByIdAndDelete(id);
    req.flash('success','Successfully deleted a plant');
    res.redirect('/plants');
}

module.exports.renderEditForm=async(req,res)=>{
    const {id}=req.params;
    const plant=await Plants.findById(id);
    if(!plant)
    {
        req.flash('error','Cannot find that plant');
        return res.redirect('/plants');
    }
    res.render('plants/edit',{plant});
}