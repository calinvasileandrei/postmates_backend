const User= require('../models/User');


const validateEmailAndPassword = async (email,password) =>{
    return User.countDocuments({"email": email, "password": password}, (err, count) => {
        if (count > 0) {
            return true;
        } else {
            return false;
        }
    });

}

const findUserIdForEmail = async  (email) =>{

    return await User.findOne({"email":email});

}
module.exports =  {validateEmailAndPassword,findUserIdForEmail};
