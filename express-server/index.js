// express-server/index.js

// require(CommonJS) = import(EMS)


require('dotenv').config();
const express = require('express')

// Cross-Origin Resource Sharing
// ブラウザには Same-Origin Policy（同一オリジン制約） がある
const cors = require('cors');

const app = express();

// Middleware 
app.use(cors());
app.use(express.json()); // For user login function

// Import Weather API
require('./api/weather')(app); // 👈 propsと同じ

// Test endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Express server is running!' });
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
});
