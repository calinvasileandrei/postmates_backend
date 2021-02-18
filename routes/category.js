const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Product = require('../models/Product');
const Restaurant= require('../models/Restaurant');
const fetch = require('node-fetch');	//npm install node-fetch


//get all
router.get('/', async (req,res)=>{
    try {
        const categories= await Category.find();
        res.json(categories);
    } catch (err) {
        res.json({message:err})
    }
});

//autogen
router.get('/autogen', async (req,res)=>{
        console.log("start")
         /*
         const restIds = await fetch(
           'https://api.documenu.com/v2/restaurants/search/fields?key=d3c4db1e9a1f366c04893735800ff32f'
         )
           .then((response) => response.json())
           .then((data) => data.data);


        const restaurants = await Restaurant.find();


        restaurants.forEach ( async (restaurant,index) => {
            const restNew = await Restaurant.findById(restaurant._id)

            let apiRest = restIds[index];
            const result = await fetch('https://api.documenu.com/v2/restaurant/'+apiRest.restaurant_id+'?key=d3c4db1e9a1f366c04893735800ff32f')
                .then((response) => response.json())
                .then((data) => data.result);

            console.log("retrived the info about external rest: ")
            console.log(result);
            menus = result.menus[0].menu_sections
            for(let i=0;i<5;i++){ //get 5 categories
                let section = menus[i];
                console.log("section:");
                console.log(section);
                let category = new Category({
                  title: section.section_name,
                  restaurant: restaurant._id,
                })
                console.log('new cat : ' + section.section_name)
                let savedCategory = await category.save();
                let menuItems = section.menu_items
                console.log("menu items:")
                console.log(menuItems)
                const categoryNew = await Category.findById(savedCategory._id)

                menuItems.forEach( async (items)=>{
                    console.log(items)
                    let product = new Product({
                      title: items.name,
                      restaurant: restaurant._id,
                      category: savedCategory._id,
                      description: items.description==''||items.description== undefined ? "No description":items.description,
                      price: items.price,
                    })
                    console.log('new product in the cat: ' + items.name)
                    let savedProduct = await product.save()
                    categoryNew.products.push(savedProduct._id)
                })
                console.log("process done");
                savedCategory = await categoryNew.save()
                console.log("saving categories");
                

                restNew.categories.push(savedCategory._id)
            }
            
            let savedRestaurant = await restNew.save()

            console.log("rest saved!");


        });

        res.json(restaurants);

          */
        res.json({message:"Deprecated endpoint"});
    
});


//create
router.post('/', async (req,res)=>{
    const category = new Category({
        title: req.body.title,
        restaurant: req.body.restaurant
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
