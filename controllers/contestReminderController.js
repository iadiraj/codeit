const axios = require('axios');
const Contest = require('../models/ContestReminderSchema');
const DateNTime = require('../methods/dateNtimeSeperater');
const User = require('../models/UserSchema');
module.exports.contestReminderController = async (req, res) => {
    try{
        const contestName = req.body.contestname;
        const contestUrl = req.body.contesturl;
        const contestDateTime = req.body.contestdatetime;
        const data = DateNTime.dateNtime(contestDateTime);
        const contestDate = data.newDate.trim();
        const contestTime = data.newTime.trim();
        const username = req.user.username;
        const user = await User.findOne({username : username}).exec();
        const contest = await Contest.create({
            name : contestName,
            url : contestUrl,
            time : contestTime,
            date : contestDate,
            number : user.phone
        });
        return res.status(200).json({
            message : 'Reminder Set!'
        });
    }catch (e) {
        return res.status(502).json({
            message : 'BAD GATEWAY'
        });
    }
}