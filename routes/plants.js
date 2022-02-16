const express=require('express');
const router=express.Router();
const {validatePlant,validateId,isLoggedIn}=require('../middleware');
const catchAsync=require('../utils/catchAsync');
const plants=require('../controllers/plants');

router.route('/')
      .get(catchAsync(plants.index))
      .post(validatePlant,isLoggedIn,catchAsync(plants.createPlants))

router.get('/new',isLoggedIn,plants.renderNewForm)

router.route('/:id')
      .get(validateId,isLoggedIn,catchAsync(plants.showPlants))
      .put(validateId,validatePlant,catchAsync(plants.updatePlants))
      .delete(validateId,catchAsync(plants.deletePlants))

router.get('/:id/edit',validateId,catchAsync(plants.renderEditForm))





module.exports=router;