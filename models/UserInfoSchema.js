const mongoose = require('mongoose');

const UserInfoSchema = new mongoose.Schema({
    leetcodeUsername : String,
    codeforcesUsername : String
});
const UserInfo = mongoose.model('UserInfo', UserInfoSchema);
module.exports = UserInfo;