const express = require('express');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken')
const fs = require('fs')
const router = express.Router();
const userService = require('../services/user');
const User = require('../models/User');

const RSA_PRIVATE_KEY = fs.readFileSync('./private.key');
const RSA_PUBLIC_KEY = fs.readFileSync('./public.key');

const checkIfAuthenticated = expressJwt({
    secret: RSA_PUBLIC_KEY,
    algorithms: ['RS256']
});

const decodeTokenHeader = (tokenHeader)=>{
    let token = tokenHeader.split(" ")[1];
    const decoded = jwt.verify(token, RSA_PRIVATE_KEY,{ algorithms: 'RS256'});
    return decoded.id;
}

const decodeToken = (token)=>{
    const decoded = jwt.verify(token, RSA_PRIVATE_KEY,{ algorithms: 'RS256'});
    return decoded.id;
}

//get all
router.get('/authenticated', checkIfAuthenticated, (req,res)=>{
    res.json({message:"auth"})
});

//get all
router.post('/decode', async (req,res)=>{
    let id = decodeToken(req.body.token)
    res.json({message:id})
});

router.post('/login',async (req,res)=> {
    const email = req.body.email, password = req.body.password;

    if ( await  userService.validateEmailAndPassword(email,password)) {
        const user = await userService.findUserIdForEmail(email);
        const jwtBearerToken = jwt.sign({
            id:user._id.toHexString()
        }, RSA_PRIVATE_KEY, {
            algorithm: 'RS256',
            expiresIn: '86400',
            subject: user._id.toHexString(),
        });
        //res.cookie("SESSIONID", jwtBearerToken, {httpOnly:true, secure:true});
        res.status(200).json({
            idToken: jwtBearerToken,
            expiresIn: '86400',
            message: 'Loggin Successfully'
        });

        // send the JWT back to the user
        // TODO - multiple options available

    }
    else {
        // send status 401 Unauthorized
        res.status(200).json({
            idToken: '',
            expiresIn: '',
            message:'Invalid credentials'
        });
    }
});


router.post('/register', async (req,res)=>{
    console.log("registered user:"+req.body.user);

    const user = new User({
        name: req.body.user.name,
        surname: req.body.user.surname,
        phone: req.body.user.phone,
        email: req.body.user.email,
        age: req.body.user.age,
        password: req.body.user.password,
        cart: []
    })

    const savedUser = await user.save();
    try{
        res.json(savedUser)
    }catch(err){
        res.json({message:err});
    }

});

router.get('/', async (req,res)=>{
    try {
        const users= await User.find();
        res.json(users);
    } catch (err) {
        res.json({message:err})
    }
});

module.exports = {router,checkIfAuthenticated,decodeToken,decodeTokenHeader};
