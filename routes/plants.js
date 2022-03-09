const express=require('express');
const router=express.Router();
const {validatePlant,validateId,isLoggedIn,isAuthor}=require('../middleware');
const catchAsync=require('../utils/catchAsync');
const plants=require('../controllers/plants');
const multer  = require('multer');
const {storage}=require('../cloudinary');
const upload = multer({ storage })

router.route('/')
      .get(catchAsync(plants.index))
      .post(isLoggedIn,upload.array('image'),validatePlant,catchAsync(plants.createPlants))
      
router.get('/new',isLoggedIn,plants.renderNewForm)

router.route('/:id')
      .get(validateId,catchAsync(plants.showPlants))
      .put(validateId,isLoggedIn,isAuthor,upload.array('image'),validatePlant,catchAsync(plants.updatePlants))
      .delete(validateId,isLoggedIn,isAuthor,catchAsync(plants.deletePlants))

router.get('/:id/edit',isLoggedIn,isAuthor,validateId,catchAsync(plants.renderEditForm))





module.exports=router;