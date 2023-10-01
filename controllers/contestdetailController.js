const axios = require('axios');
const {kontestApi} = require('../misc/apis');
const contestFilter = require('../methods/contestFIlters');
// status
const status = {
    ongoing : 'ongoing',
    upcoming : 'upcoming'
}

// contest controller
module.exports.contestController = async (req, res) => {
    try{
        const response = await axios.get(`${kontestApi}/${req.params.plat}`);
        const data = await response.data;
        if(req.params.status === status.ongoing){
            return res.status(200).json(data.filter(contestFilter.OngoingContestFilter));
        }else if(req.params.status === status.upcoming){
            return res.status(200).json(data.filter(contestFilter.UpcomingContestFilter));
        }
        return res.status(404).json({message : 'NOT FOUND!'});
    }catch (e){
        console.log(e);
        return res.status(502).json({message : "BAD GATEWAY"});
    }
}