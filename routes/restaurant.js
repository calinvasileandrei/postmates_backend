const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const Section = require('../models/Section');


//get all
router.get('/', async (req,res)=>{
    try {
        const restaurants= await Restaurant.find();
        res.json(restaurants);
    } catch (err) {
        res.json({message:err})
    }
});


//create
router.post('/', async (req,res)=>{
    const restaurant = new Restaurant({
        title: req.body.title,
        priceDelivery: req.body.priceDelivery,
        delivery:  req.body.delivery,
        badge: req.body.badge,
        verified: req.body.verified,
        image: req.body.image,
        position: req.body.position
    })
    let sectionToAdd=""
    try{
        sectionToAdd = req.body.section
        let section = await Section.findById(sectionToAdd);
        section.restaurants.push(restaurant);
        await section.save();
    }catch(e){
        console.log("No category");
    }

    const savedRestaurant = await restaurant.save();
    try{
        res.json(savedRestaurant)
    }catch(err){
        res.json({message:err});
    }

});


//get one
router.get('/:id', async(req,res)=>{
    try {
        const restaurant= await Restaurant.findById(req.params.id);
        res.json(restaurant)
    } catch (err) {
        res.json({ message: err })
    }
})


//delete one
router.delete('/:id', async (req,res)=>{
    try {
        const removedRestaurant = await Restaurant.remove({ _id: req.params.id });
        res.json(removedRestaurant);
    } catch (err) {
        res.json({ message: err })
    }
})


//update one
router.patch('/:id', async (req,res)=>{
    try {
        const updatedRestaurant = await Restaurant.updateOne({ _id: req.params.id },{$set:{title: req.body.title}});
        res.json(updatedRestaurant)
    } catch (err) {
        res.json({ message: err })
    }
})

module.exports = router;
