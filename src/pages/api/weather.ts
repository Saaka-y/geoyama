export default async function handler(req, res) {
  const { lat, lon } = req.query;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.OPENWEATHER_KEY}`
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: "OpenWeather failed" });
    }

    const data = await response.json();
    console.log("OpenWeather data:", data);
    return res.status(200).json(data);

  } catch (err) {
    console.error("Weather API error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
