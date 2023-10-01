const axios = require('axios');
const DateNTime = require('../methods/dateNtimeSeperater');
const mongoose = require('../configs/mongoose');
const Contest = require('../models/ContestReminderSchema');
const twilio = require('twilio');
const accountSid = 'AC86ae1f2227e16eb507c0715ba2051351';
const authToken = '354aa99e995e47aa751727777ff3f2a9';
const client = twilio(accountSid, authToken);
const from = '+12705454373';
module.exports.contestReminderSenderService = async (req, res) => {
    for await (const doc of Contest.find()) {
        let currentData = DateNTime.currentdateNtime();
        date1 = currentData.formattedDate;
        date2 = doc.date;
        time1 = currentData.formattedTime;
        time2 = doc.time.trim();
        if((date1 === date2) && (time1 === time2) && (doc.sent === "false")){
            const body = `Hurry Up! Contest is about to start. Join now ${doc.url}.`;
            const to = `+91${doc.number}`;
            try {
                const message = await client.messages.create({
                    body,
                    from: from,
                    to,
                });
                console.log('WhatsApp message sent:', message.sid);
                doc.sent = "true";
            } catch (error) {
                console.error('Error sending WhatsApp message:', error);
            }
            try {
                await doc.deleteOne();
                console.log('Document deleted:', doc._id);
            } catch (error) {
                console.error('Error deleting document:', error);
            }
        }
    }
}