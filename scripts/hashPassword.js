
const bcrypt = require('bcrypt');

const password = 'password123!4!'; 
const saltRounds = 10;

bcrypt.hash(password, saltRounds, function(err, hash) {
  if (err) throw err;
  console.log('hashed:', hash);
});
