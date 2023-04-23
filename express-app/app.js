const express = require('express');
const mysql = require('mysql2');
const fs = require('fs');
const bodyParser = require('body-parser');
const fetch = require("node-fetch");
const OPENAI_API_KEY = "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"; // Replace with your API key
const API_URL = "https://api.openai.com/v1/engines/davinci-codex/completions";
const app = express();
const port = process.env.PORT || 3000;

async function generateRelatedTags(inputTags, description) {
  const tagsString = inputTags.join(", ");
  const prompt = `Among tags: ${tagsString}, Generate related tags based on the following project ${description} `;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      prompt: prompt,
      max_tokens: 50,
      n: 1,
      stop: null,
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  const relatedTagsText = data.choices[0].text.trim();
  const relatedTags = relatedTagsText.split(",").map(tag => tag.trim());
  return relatedTags;
}


function readJSONFile(filePath) {
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const jsonData = JSON.parse(rawData);
  return jsonData;
}

// get data from tech_stack.json
const jsonFilePath = 'tech-stack.json';
const data = readJSONFile(jsonFilePath);
const inputTags = []
data.for_each((category) => {
  category.for_each((tag) => {
    inputTags.append(tag["name"])
  })
})

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
  const { title, description, category, tech_stack } = req.body;

  if (!title || !description || !categories || !tech_stack) {
    return res.json({ status: 'error', message: 'Please fill out all fields' });
  }
  const relatedTags = generateRelatedTags(inputTags,description)

  const insertQuery = "INSERT INTO projects (title, description, category,tags, state) VALUES (?, ?, ?, ?, ?, 1)";
  pool.query(insertQuery, [title, description, category, tech_stack, relatedTags ], (err, result) => {
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
  const relatedTags = generateRelatedTags(inputTags,description)

  const updateQuery = "UPDATE projects SET title = ?, description = ?, categories = ?, tags, state = ? WHERE title = ?";
  pool.query(updateQuery, [projectName, projectDescription, projectCategories, tech_stack,relatedTags, state, projectName], (err, result) => {
    if (err) throw err;
    res.json({ status: 'success' });
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
