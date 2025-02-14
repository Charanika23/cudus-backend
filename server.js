require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const twilio = require("twilio");

const app = express();
const PORT = 5000;

// Twilio credentials from .env file
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE;
const client = twilio(accountSid, authToken);

app.use(cors());
app.use(bodyParser.json());

// API route to send notification
app.post("/send-notification", (req, res) => {
    const { sender, receiver, message } = req.body;
    const recipientNumber = sender === "charanika@gmail.com" ? process.env.ASHISH_PHONE : process.env.CHARANIKA_PHONE;
    console.log(recipientNumber)
    client.messages
        .create({
            body: `📩 New Message from ${sender}: ${message}`,
            from: twilioPhone,
            to: recipientNumber
        })
        .then(() => res.json({ success: true, message: "Notification sent!" }))
        .catch(error => res.status(500).json({ success: false, error: error.message }));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
