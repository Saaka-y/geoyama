// express-server/api/weather

//**** Weather API ****/

module.exports = (app) => { // app を受け取る関数をエクスポートする
  app.get('/api/weather', async (req, res) => {
    const { lat, lon } = req.query;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.OPENWEATHER_KEY}`
      );

      if (!response.ok) {
        return res.status(response.status).json({ error: "OpenWeather failed" });
      }

      const data = await response.json();
      return res.status(200).json(data);

    } catch (err) {
      console.error("Weather API error:", err);
      return res.status(500).json({ error: "Server error" });
    }

  })
}