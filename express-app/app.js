const express = require('express');
const app = express();
const mysql = require('mysql2');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'projects',
});

db.connect();


app.post('/api/create_project', (req, res) => {
  const data = req.body;
  const { title, description, catagories, tech_stack } = data;

  if (!title || !description || !catagories || !tech_stack) {
    return res.json({ status: 'error', message: 'Please fill out all fields' });
  }

  const insert_query = "INSERT INTO projects (title, description, catagories, tech_stack, state) VALUES (?, ?, ?, ? , 'open')";
  db.query(insert_query, [title, description, catagories, tech_stack], (err, result) => {
    if (err) throw err;
    res.json({ status: 'success' });
  });
});

app.post('/api/create_user', (req, res) => {
  const data = req.body;
  const { username, email, password } = data;

  const insert_query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  db.query(insert_query, [username, email, password], (err, result) => {
    if (err) throw err;
    res.json({ status: 'success' });
  });
});

app.get('/api/get_projects', (req, res) => {
  db.query("SELECT * FROM projects", (err, projects) => {
    if (err) throw err;
    res.json({ status: 'success', projects: projects });
  });
});

app.post('/api/update-profile', (req, res) => {
  const data = req.body;
  const { username, skills, bio } = data;

  if (!username || !skills || !bio) {
    return res.json({ status: 'error', message: 'Please fill out all fields' });
  }

  const update_query = "UPDATE users SET username = ?, skills = ?, bio = ? WHERE username = ?";
  db.query(update_query, [username, skills, bio, username], (err, result) => {
    if (err) throw err;
    res.json({ status: 'success' });
  });
});

app.post('/api/update-project', (req, res) => {
  const data = req.body;
  const { projectName, projectDescription, projectType, tech_stack, state } = data;

  if (!projectName || !projectDescription || !projectType || !state) {
    return res.json({ status: 'error', message: 'Please fill out all fields' });
  }

  const update_query = "UPDATE projects SET title = ?, description = ?, catagories = ?, tech_stack = ?, state = ? WHERE title = ?";
  db.query(update_query, [projectName, projectDescription, projectType, tech_stack, state, projectName], (err, result) => {
    if (err) throw err;
    res.json({ status: 'success' });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
