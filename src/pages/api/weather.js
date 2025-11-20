
export default async function handler(req, res) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=35.6513&lon=139&units=metric&appid=${process.env.OPENWEATHER_KEY}`
  );
  const data = await response.json();
  res.status(200).json(data);
}

