
export default async function handler(req, res) {
  const { lat, lon } = req.query;
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.OPENWEATHER_KEY}`
  );
  const data = await response.json();
  res.status(200).json(data);
}

