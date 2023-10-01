const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JWT_SECRET_KEY = require('../misc/misc');
const db = require('../configs/mongoose');
const User = require('../models/UserSchema');
const UserInfo = require('../models/UserInfoSchema');
const {json} = require("express");

// signup controller
module.exports.signUp = async (req, res) => {
    try{
        const username = req.body.username;
        const phone = req.body.phone;
        const password = req.body.password;
        const lcUsername = req.body.lcUsername;
        const cfUsername = req.body.cfUsername;
        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create UserInfo in DB
        const userinfo = await UserInfo.create({
            leetcodeUsername : lcUsername,
            codeforcesUsername : cfUsername
        });
        // Create User in DB
        const user = await User.create({
            username : username,
            password : hashedPassword,
            phone : phone,
            userInfo : userinfo._id
        })
        // Generate a JWT token
        const token = jwt.sign({username}, JWT_SECRET_KEY);
        // Return the Generated token
        return res.status(201).json({token});
    }catch (e) {
        console.log(e);
        return res.status(500).json({message : 'An Error Occurred!'});
    }
}

module.exports.logIn = async (req, res) => {
    try{
        const { username, password } = req.body;
        // Find the User by Username
        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({message : 'Invalid Username'});
        }
        // Verify the Password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword){
            return res.status(400).json({message : 'Invalid Password'});
        }
        // Generate a JWT token
        const token = jwt.sign({username}, JWT_SECRET_KEY);
        // Return the Generated token
        return res.status(201).json({token});
    }catch (e) {
        console.log(e);
        return res.status(500).json({message : 'An Error Occurred'});
    }
}

module.exports.logOut = async (req, res) => {
    res.json({message : 'Logout Successfully'});
}