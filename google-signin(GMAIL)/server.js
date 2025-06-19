const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const USERS_FILE = path.join(__dirname, 'data', 'users.json');

app.use(express.json());
app.use(express.static('public'));

// Ensure data directory and file exist
fs.mkdirSync(path.dirname(USERS_FILE), { recursive: true });
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([]));
}

app.post('/submit', (req, res) => {
  const { username, password } = req.body;
  if (!username || typeof username !== 'string' || !password || typeof password !== 'string') {
    return res.status(400).json({ message: 'Invalid username or password.' });
  }

  const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
  users.push({ username, password, timestamp: new Date().toISOString() });
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

  res.json({ message: 'User saved successfully!' });
});

// Open app in browser
const open = (...args) => import('open').then(m => m.default(...args));
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  open(`http://localhost:${PORT}`);
});
