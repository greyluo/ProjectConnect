const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'projects',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.post('/api/create_project', (req, res) => {
  const { title, description, categories, tech_stack } = req.body;

  if (!title || !description || !categories || !tech_stack) {
    return res.json({ status: 'error', message: 'Please fill out all fields' });
  }

  const insertQuery = "INSERT INTO projects (title, description, categories, tech_stack, state) VALUES (?, ?, ?, ?, 'open')";
  pool.query(insertQuery, [title, description, categories, tech_stack], (err, result) => {
    if (err) throw err;
    res.json({ status: 'success' });
  });
});

app.post('/api/create_user', (req, res) => {
  const { username, email, password } = req.body;

  const insertQuery = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  pool.query(insertQuery, [username, email, password], (err, result) => {
    if (err) throw err;
    res.json({ status: 'success' });
  });
});

app.get('/api/get_projects', (req, res) => {
  pool.query("SELECT * FROM projects", (err, projects) => {
    if (err) throw err;
    res.json({ status: 'success', projects: projects });
  });
});
app.get('/api/', (req, res) => {
  res.send('Hello World!');
});

app.post('/api/update_profile', (req, res) => {
  const { username, skills, bio } = req.body;

  if (!username || !skills || !bio) {
    return res.json({ status: 'error', message: 'Please fill out all fields' });
  }

  const updateQuery = "UPDATE users SET username = ?, skills = ?, bio = ? WHERE username = ?";
  pool.query(updateQuery, [username, skills, bio, username], (err, result) => {
    if (err) throw err;
    res.json({ status: 'success' });
  });
});

app.post('/api/update_project', (req, res) => {
  const { projectName, projectDescription, projectCategories, tech_stack, state } = req.body;

  if (!projectName || !projectDescription || !projectCategories || !tech_stack || !state) {
    return res.json({ status: 'error', message: 'Please fill out all fields' });
  }

  const updateQuery = "UPDATE projects SET title = ?, description = ?, categories = ?, tech_stack = ?, state = ? WHERE title = ?";
  pool.query(updateQuery, [projectName, projectDescription, projectCategories, tech_stack, state, projectName], (err, result) => {
    if (err) throw err;
    res.json({ status: 'success' });
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
