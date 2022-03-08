const Joi=require('joi');



module.exports.plantSchema=Joi.object({
    plant:Joi.object({
        title:Joi.string().required(),
        //image:Joi.string().required(),
        price:Joi.number().required().min(0),
        description:Joi.string().required()
    }).required()
})


module.exports.reviewSchema=Joi.object({
    review:Joi.object({
        body:Joi.string().required(),
        rating:Joi.number().required().min(0)
    }).required()
})