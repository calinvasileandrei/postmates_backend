const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Product = require('../models/Product');
const User= require('../models/User');
const fetch = require('node-fetch');	//npm install node-fetch
const auth = require('./auth');


router.get('/cart',auth.checkIfAuthenticated, async (req,res)=>{
    let token = req.headers.authorization.split(" ")[1];
    let userId = await auth.decodeToken(token);
    await User.findById(userId).populate("cart").exec((err,user)=>{
        if(err){
            res.json({"error":"error populating data"});
        }
        res.json(user["cart"]);
    })
});

router.post('/cart',auth.checkIfAuthenticated, async (req,res)=>{
    console.log("carrrrt")
    let userId = await auth.decodeTokenHeader(req.headers.authorization);
    console.log("userid: "+userId+"\nproduct: ",req.body);
    let result = await User.updateOne(
        { _id: userId},
        { $push: { "cart": req.body.item._id}},
        { upsert: true, new: true , safe:true},
        );
    console.log(result);
});

router.delete('/cart/:productid',auth.checkIfAuthenticated, async (req,res)=>{
    let userId = await auth.decodeTokenHeader(req.headers.authorization);
    console.log("delete cart item, "+req.params.productid);
    let result = await User.updateOne(
        { _id: userId },
        { $pull: { "cart": req.params.productid  } },
        { upsert: true, new: true , safe:true},
        );
    console.log(result);
    res.json(result)
});



module.exports = router;
