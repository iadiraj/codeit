const axios = require("axios");
const {CodeForcesUserProfileApi, leetCodeUserProfileApi} = require('../misc/apis');
const UserInfo = require('../models/UserInfoSchema');
const User = require('../models/UserSchema');
const {response} = require("express");
module.exports.compareController = async (req, res) => {
    try{
        const username1 = req.user.username;
        const lcUsername2 = req.params.username;
        const user = await User.findOne({username : username1}).populate('userInfo').exec();
        if(!user.userInfo){
            return res.status(200).json({
                message : 'Enter the User Information'
            });
        }
        const lcUsername1 = user.userInfo.leetcodeUsername;
        const url1 = `${leetCodeUserProfileApi}${lcUsername1}`;
        const url2 = `${leetCodeUserProfileApi}${lcUsername2}`;
        const response1 = await axios.get(url1);
        const userData1 = await response1.data;
        const response2 = await axios.get(url2);
        const userData2 = await response2.data;
        const comparedData = {
            totalSolved : [userData1.totalSolved, userData2.totalSolved, await compare(userData1.totalSolved, userData2.totalSolved, 'total Question solved')],
            easySolved : [userData1.easySolved, userData2.easySolved, await compare(userData1.easySolved, userData2.easySolved, 'easy Question solved')],
            mediumSolved : [userData1.mediumSolved, userData2.mediumSolved, await compare(userData1.mediumSolved, userData2.mediumSolved, 'medium Question solved')],
            hardSolved : [userData1.hardSolved, userData2.hardSolved, await compare(userData1.hardSolved, userData2.hardSolved, 'hard Question solved')],
            acceptanceRate : [userData1.acceptanceRate, userData2.acceptanceRate, await compare(userData1.acceptanceRate, userData2.acceptanceRate, 'acceptance rate')],
            ranking : [userData1.ranking, userData2.ranking, await compare(userData1.ranking, userData2.ranking, 'ranking')],
            contributionPoints : [userData1.contributionPoints, userData2.contributionPoints, await compare(userData1.contributionPoints, userData2.contributionPoints, 'contribution point')]
        }
        return res.status(200).json(comparedData);
    }catch (e) {
        return res.status(502).json({
            message : 'BAD GATEWAY'
        });
    }
}

async function compare(data1, data2, keyword){
    let data;
    if(data1 > data2){
        data = `You have ${data1 - data2} more ${keyword} than Him.`;
    }else if(data2 > data1){
        data = `You have ${data2 - data1} less ${keyword} than Him.`;
    }else{
        data = `You Both have same ${keyword}.`;
    }
    return data;
}