const Plants=require('../models/plants');




module.exports.index=async(req,res)=>{
    const plants=await Plants.find();
    res.render('plants/index',{plants});
};

module.exports.createPlants=async(req,res)=>{
    const plant=new Plants(req.body.plant);
    plant.image=req.files.map(f=>({ url:f.path,filename:f.filename }));
    plant.author=req.user._id;
    await plant.save();
    console.log(plant);
    req.flash('success','successfully added a plant');
    res.redirect(`/plants/${plant._id}`);
}


module.exports.renderNewForm=(req,res)=>{
    res.render('plants/new');
}

module.exports.showPlants=async(req,res)=>{
    const {id}=req.params;
    
    const plant=await Plants.findById(id).populate({
        path:'reviews',
        populate:{
            path:'author'
        }
    }).populate('author');
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
    const imgs=req.files.map(f=>({ url:f.path,filename:f.filename }));
    plant.image.push(...imgs);
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
    res.render('plants/edit',{plant});
}