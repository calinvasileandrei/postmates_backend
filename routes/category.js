const express = require('express');
const router = express.Router();
const Category = require('../models/Category');


//get all
router.get('/', async (req,res)=>{
    try {
        const categories= await Category.find();
        res.json(categories);
    } catch (err) {
        res.json({message:err})
    }
});


//create
router.post('/', async (req,res)=>{
    const category = new Category({
        title: req.body.title,
    })

    const savedCategory = await category.save();
    try{
        res.json(savedCategory)
    }catch(err){
        res.json({message:err});
    }

});


//get one
router.get('/:id', async(req,res)=>{
    try {
        const category= await Category.findById(req.params.id);
        res.json(category)
    } catch (err) {
        res.json({ message: err })
    }
})


//delete one
router.delete('/:id', async (req,res)=>{
    try {
        const removedCategory = await Category.remove({ _id: req.params.id });
        res.json(removedCategory);
    } catch (err) {
        res.json({ message: err })
    }
})


//update one
router.patch('/:id', async (req,res)=>{
    try {
        const updatedCategory = await Category.updateOne({ _id: req.params.id },{$set:{title: req.body.title}});
        res.json(updatedCategory)
    } catch (err) {
        res.json({ message: err })
    }
})

module.exports = router;
