const db = require('../configs/mongoose');
const User = require('../models/UserSchema');
const UserInfo = require('../models/UserInfoSchema');
const bcrypt = require('bcrypt');

module.exports.userInfo = async (req, res) => {
    try{
        const newLcUsername = req.body.lcUsername;
        const newCfUsername = req.body.cfUsername;
        const username = req.user.username;
        const newPhone = req.body.phone;
        const newUsername = req.body.username;
        const newPassword = req.body.password;
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const user = await User.findOne({username : username}).populate('userInfo').exec();
        console.log(user);
        if(!user){
            return res.status(500).json({message : "User not Found!"});
        }
        user.username = newUsername;
        user.phone = newPhone;
        user.password = hashedPassword;
        // user.userInfo.leetcodeUsername = newLcUsername;
        // user.userInfo.codeforcesUsername = newCfUsername;
        await user.save;
        return res.status(200).json({message : "SUCCESSFUL!"});
    }catch (e) {
        console.log(e);
        return res.status(502).json({message : 'BAD GATEWAY'});
    }
}