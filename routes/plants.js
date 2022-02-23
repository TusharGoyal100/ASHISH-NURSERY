const express=require('express');
const router=express.Router();
const {validatePlant,validateId,isLoggedIn,isAuthor}=require('../middleware');
const catchAsync=require('../utils/catchAsync');
const plants=require('../controllers/plants');

router.route('/')
      .get(catchAsync(plants.index))
      .post(validatePlant,isLoggedIn,catchAsync(plants.createPlants))

router.get('/new',isLoggedIn,plants.renderNewForm)

router.route('/:id')
      .get(validateId,isLoggedIn,catchAsync(plants.showPlants))
      .put(validateId,isLoggedIn,isAuthor,validatePlant,catchAsync(plants.updatePlants))
      .delete(validateId,isAuthor,catchAsync(plants.deletePlants))

router.get('/:id/edit',isLoggedIn,isAuthor,validateId,catchAsync(plants.renderEditForm))





module.exports=router;