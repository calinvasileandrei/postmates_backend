const express = require('express');
const router = express.Router();
const Section = require('../models/Section');
const Restaurant = require('../models/Restaurant');


//get all
router.get('/', async (req,res)=>{
    try {
        const sections= await Section.find();
        res.json(sections);
    } catch (err) {
        res.json({message:err})
    }
});


//create
router.post('/', async (req,res)=>{
    const section = new Section({
        title: req.body.title,
        subtitle: req.body.subtitle
    })

    const savedSection = await section.save();
    try{
        res.json(savedSection)
    }catch(err){
        res.json({message:err});
    }

});


//get one
router.get('/:id', async(req,res)=>{
    try {
        const section= await Section.findById(req.params.id);
        res.json(section)
    } catch (err) {
        res.json({ message: err })
    }
})

//add restaurant to section
router.post('/:id', async(req,res)=>{
    try {
        const section = await Section.findById(req.params.id);
        const restaurant = await Restaurant.findById(req.body.restaurantId)
        section.restaurants.push(restaurant)
        section.save()
        res.json(section)
    } catch (err) {
        res.json({ message: err })
    }
})


//delete one
router.delete('/:id', async (req,res)=>{
    try {
        const removeSection = await Section.remove({ _id: req.params.id });
        res.json(removeSection);
    } catch (err) {
        res.json({ message: err })
    }
})


//update one
router.patch('/:id', async (req,res)=>{
    try {
        const updatedSection = await Section.updateOne({ _id: req.params.id },{$set:{title: req.body.title}});
        res.json(updatedSection)
    } catch (err) {
        res.json({ message: err })
    }
})

module.exports = router;
