const Plants=require('../models/plants')



module.exports.index=async(req,res)=>{
    res.cookie('name','tushar')
    const plants=await Plants.find();
    res.render('plants/index',{plants});
};

module.exports.createPlants=async(req,res)=>{

    const plant=new Plants(req.body.plant);
    await plant.save();
    res.redirect(`/plants/${plant._id}`);
}


module.exports.renderNewForm=(req,res)=>{
    res.render('plants/new');
}

module.exports.showPlants=async(req,res)=>{
    const {id}=req.params;
    const plant=await Plants.findById(id).populate('reviews');
    res.render('plants/show',{plant});
}

module.exports.updatePlants=async(req,res)=>{
    const {id}=req.params;
    const plant=await Plants.findByIdAndUpdate(id,{...req.body.plant});
    await plant.save();
    res.redirect(`/plants/${plant._id}`);
}

module.exports.deletePlants=async(req,res)=>{
    const {id}=req.params;
    await Plants.findByIdAndDelete(id);
    res.redirect('/plants');
}

module.exports.renderEditForm=async(req,res)=>{
    const {id}=req.params;
    const plant=await Plants.findById(id);
    res.render('plants/edit',{plant});
}