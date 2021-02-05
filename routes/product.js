const express = require('express');
const router = express.Router();
const Product = require('../models/Product');


//get all
router.get('/', async (req,res)=>{
    try {
        const products= await Product.find();
        res.json(products);
    } catch (err) {
        res.json({message:err})
    }
});


//create
router.post('/', async (req,res)=>{
    const product = new Product({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
    })

    const savedProduct = await product.save();
    try{
        res.json(savedProduct)
    }catch(err){
        res.json({message:err});
    }

});


//get one
router.get('/:id', async(req,res)=>{
    try {
        const product= await Product.findById(req.params.id);
        res.json(product)
    } catch (err) {
        res.json({ message: err })
    }
})


//delete one
router.delete('/:id', async (req,res)=>{
    try {
        const removedProduct = await Product.remove({ _id: req.params.id });
        res.json(removedProduct);
    } catch (err) {
        res.json({ message: err })
    }
})


//update one
router.patch('/:id', async (req,res)=>{
    try {
        const updatedProduct = await Product.updateOne({ _id: req.params.id },{$set:{title: req.body.title}});
        res.json(updatedProduct)
    } catch (err) {
        res.json({ message: err })
    }
})

module.exports = router;
