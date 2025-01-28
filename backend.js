const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

const apiKey = "21d548c1977e209ff614625a6d7eeb87"; // Replace with your API key

app.use(express.static('.'));

app.get('/api/track-flight', async (req, res) => {
  const flightNumber = req.query.flightNumber;
  if (!flightNumber) {
    return res.status(400).json({ success: false, message: "Flight number is required" });
  }

  try {
    const url = `https://api.aviationstack.com/v1/flights?access_key=${apiKey}&flight_number=${flightNumber}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.data && data.data.length > 0) {
      res.json({ success: true, flight: data.data[0] });
    } else {
      res.json({ success: false, message: "No flight data found" });
    }
  } catch (error) {
    console.error("Error fetching flight data:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
