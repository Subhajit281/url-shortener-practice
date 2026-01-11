const User = require("../models/user");
const AppError = require("../utils/AppError");
const {v4 : uuidv4 } = require('uuid');
const {setUser} = require("../utils/auth");
const bcrypt = require("bcrypt");

async function handleUserSignUp(req,res,next){
    try{
        // const {name,email,password} = req.body;
        const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);
        const users = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword,
    });
    if(!users) return next(new AppError("User cannot be created",400));

    // users.save((err)=>{
    //     if(err) return next(new AppError("Couldnt save",400));
    // }) ======= User.create() saves automatically ==========

    return res.status(201).json({msg:"Created",users});
    }catch(err){
        next(err);
    }
}

async function handleUserLogin(req,res,next){
    const {email,password} = req.body;

    const user = await User.findOne({email});
    if(!user) return next(new AppError("Please try login with Valid Username and Password",401));

    const isMatched = await bcrypt.compare(password,user.password);
    if(!isMatched) return next(new AppError("Invalid email or password",401));

    const sessionId = uuidv4();
    setUser(user,sessionId);
    
    res.cookie("uid",sessionId);
    return res.json({ message: "Login successful" });

}
module.exports = {
    handleUserSignUp,
    handleUserLogin,
};