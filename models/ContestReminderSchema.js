const mongoose = require('mongoose');

const ContestReminderSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    url : {
        type : String,
        required : true
    },
    time : {
        type : String,
        required : true
    },
    date : {
        type : String,
        required : true
    },
    number : {
        type : Number,
        required : true
    },
    sent : {
        type : String,
        required : true,
        default : "false"
    }
});

const Contest = mongoose.model("Contest", ContestReminderSchema);
module.exports = Contest;