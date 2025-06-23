import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const App = () => {
  const [topic, setTopic] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [timeZone, setTimeZone] = useState("UTC");

  const bookSlot = async () => {
    const res = await fetch("http://localhost:4000/api/book-slot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic,
        dateTime,
        timeZone,
        requesterEmail: "user@reltio.com",
        trainerEmail: "trainer@reltio.com",
      }),
    });
    const data = await res.json();
    alert(`Meeting booked! Link: ${data.meetingLink}`);
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center">Book Reltio Training</h1>
      <Input placeholder="Training Topic" onChange={(e) => setTopic(e.target.value)} />
      <Input type="datetime-local" onChange={(e) => setDateTime(e.target.value)} />
      <Select onValueChange={setTimeZone}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Timezone" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="UTC">UTC</SelectItem>
          <SelectItem value="America/Los_Angeles">PST</SelectItem>
          <SelectItem value="Asia/Kolkata">IST</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={bookSlot}>Book Slot</Button>
    </div>
  );
};

export default App;