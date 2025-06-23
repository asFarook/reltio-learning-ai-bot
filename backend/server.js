const express = require("express");
const { bookTrainingSlot } = require("./calendar");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/book-slot", async (req, res) => {
  const { topic, dateTime, timeZone, requesterEmail, trainerEmail } = req.body;

  try {
    const event = await bookTrainingSlot({ topic, dateTime, timeZone, requesterEmail, trainerEmail });
    res.json({
      status: "success",
      meetingLink: event.hangoutLink,
      eventId: event.id,
    });
  } catch (err) {
    console.error("Booking failed", err);
    res.status(500).json({ error: "Booking failed. Please try again later." });
  }
});

app.listen(4000, () => console.log("Booking API running on port 4000"));