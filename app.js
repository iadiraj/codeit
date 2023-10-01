const port = 8000;
const db = require('./configs/mongoose');
const ReminderService = require('./controllers/ReminderSender')
const cron = require('node-cron');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {contestReminderController} = require("./controllers/contestReminderController");
const req = require("express/lib/request");
const res = require("express/lib/response");
app.use(bodyParser.json());
app.use(`/`, require('./routers'));
cron.schedule('* * * * * *', () => {
    ReminderService.contestReminderSenderService();
});
app.listen(port, (err)=>{
    if(err) console.log(`Error in running the server : ${err}`);
    console.log(`Server successfully running on http://localhost:${port}`);
})