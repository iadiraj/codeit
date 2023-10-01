const axios = require("axios");
const {CodeForcesUserProfileApi, leetCodeUserProfileApi} = require('../misc/apis');
const {codeforcesProfile, leetcodeProfile} = require('./userprofileController');
const UserInfo = require('../models/UserInfoSchema');
const User = require('../models/UserSchema');

module.exports.homeController = async (req, res) => {
    try{
        const username = req.user.username;
        const user = await User.findOne({username : username}).populate('userInfo').exec();
        if(!user.userInfo){
            return res.status(200).json({
                message : 'Enter the User Information'
            });
        }
        // username
        const lcUsername = user.userInfo.leetcodeUsername;
        const cfUsername = user.userInfo.codeforcesUsername;

        // urls
        const url2 = `${leetCodeUserProfileApi}${lcUsername}`;
        const url1 = `${CodeForcesUserProfileApi}${cfUsername}`;

        // fetching the data1
        const response1 = await axios.get(url1);
        const result = await response1.data;
        const userData1 = result.result[0];

        // fetching the data2
        const response2 = await axios.get(url2);
        const userData2 = await response2.data;

        // return the data's
        return res.status(200).json({
            userData1,
            userData2
        });
    }catch (e) {
        return res.status(502).json({
            message : 'BAD GATEWAY'
        });
    }
}