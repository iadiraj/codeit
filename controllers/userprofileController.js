const axios = require("axios");
const {CodeForcesUserProfileApi, leetCodeUserProfileApi} = require('../misc/apis');

module.exports.leetcodeProfile = async (req, res)=>{
    try{
        const response = await axios.get(`${leetCodeUserProfileApi}/${req.params.username}`);
        const userData = await response.data;
        return res.status(200).json(userData);
    }catch (err){
        return res(502).json({message : 'UNABLE TO FETCH DATA'});
    }
}

module.exports.codeforcesProfile = async (req, res)=>{
    try{
        const response = await axios.get(`${CodeForcesUserProfileApi}${req.params.username}`);
        const userData = await response.data;
        return res.status(200).json(userData);
    }catch (err){
        return res.status(502).json({message : 'UNABLE TO FETCH DATA'});
    }
}