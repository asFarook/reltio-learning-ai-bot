const { google } = require("googleapis");
const credentials = require("./credentials.json");

const SCOPES = ["https://www.googleapis.com/auth/calendar"];

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: SCOPES,
});

const calendar = google.calendar({ version: "v3", auth });

async function bookTrainingSlot({ topic, dateTime, timeZone, trainerEmail, requesterEmail }) {
  const event = {
    summary: `Reltio Training: ${topic}`,
    location: "Virtual (Google Meet)",
    description: `Training session on ${topic} for Reltio stakeholders.`,
    start: {
      dateTime,
      timeZone,
    },
    end: {
      dateTime: new Date(new Date(dateTime).getTime() + 60 * 60 * 1000).toISOString(),
      timeZone,
    },
    attendees: [{ email: trainerEmail }, { email: requesterEmail }],
    conferenceData: {
      createRequest: {
        requestId: `${Date.now()}`,
        conferenceSolutionKey: { type: "hangoutsMeet" },
      },
    },
  };

  const res = await calendar.events.insert({
    calendarId: "primary",
    resource: event,
    conferenceDataVersion: 1,
  });

  return res.data;
}

module.exports = { bookTrainingSlot };