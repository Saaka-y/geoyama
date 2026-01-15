// express-server/index.js

require('dotenv').config();
const express = require('express')

// Cross-Origin Resource Sharing
// ブラウザには Same-Origin Policy（同一オリジン制約） がある
const cors = require('cors');

const app = express();

// Middleware 
app.use(cors());
app.use(express.json()); // For user login function

// Test endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Express server is running!' });
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
});

//**** Weather API ****/
app.get('/api/weather', async (req, res) => {
  const {lat, lon} = req.query;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.OPENWEATHER_KEY}`
    );

    if(!response) {
      return res.status(response.status).json({ error: "OpenWeather failed" });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch(err) {
    console.error("Weather API error:", err);
    return res.status(500).json({error:"Server error" });
  }

})