const express=require('express');
const router=express.Router();
const {validatePlant}=require('../middleware');
const catchAsync=require('../utils/catchAsync');
const plants=require('../controllers/plants')

router.route('/')
      .get(catchAsync(plants.index))
      .post(validatePlant,catchAsync(plants.createPlants))

router.get('/new',plants.renderNewForm)

router.route('/:id')
      .get(catchAsync(plants.showPlants))
      .put(validatePlant,catchAsync(plants.updatePlants))
      .delete(catchAsync(plants.deletePlants))

router.get('/:id/edit',catchAsync(plants.renderEditForm))





module.exports=router;