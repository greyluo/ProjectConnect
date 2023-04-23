const express = require('express');
const fs = require('fs');
const multer = require('multer');
const bodyParser = require('body-parser');
const OPENAI_API_KEY = "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"; // Replace with your API key
const API_URL = "https://api.openai.com/v1/engines/davinci-codex/completions";
const app = express();
const port = process.env.PORT || 3000;
/* app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); */
const upload = multer();

const { Configuration, OpenAIApi } = require("openai");
/*
const configuration = new Configuration({
  organization:"org-aBFJMDpur3IqSGcurTNrkC31",
  apiKey:'sk-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',
});
const openai = new OpenAIApi(configuration);
 */




function readJSONFile(filePath) {
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const jsonData = JSON.parse(rawData);
  return jsonData;
}

// get data from tech_stack.json
const jsonFilePath = 'tech-stack.json';
const data = Array.from(readJSONFile(jsonFilePath));
const inputTags = []
data.forEach((category) => {
  category.forEach((tag) => {
    inputTags.append(tag["name"])
  })
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password : '',
  database: 'projects'
})

connection.connect()

app.post('/api/create_project',upload.none(), async (req, res) => {
  const { title, description, category} = req.body;
  console.log(req.body)

  if (!title || !description || !category) {
    return res.json({ status: 'error', message: 'Please fill out all fields' });
  }
  const insertQuery = "INSERT INTO projects (title, description, category, state) VALUES (?, ?, ?, ?, 1)";
  /* const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Among tags from ${inputTags}, generate the most related tags based on the project: ${description}",
    max_tokens: "50"
  }); */
  /* related_tages = completion.data.choices[0].text */
    connection.query(insertQuery, [req.body.title, req.body.description, req.body.category], (err, result) => {
    if (err) throw err;
    res.json({ status: 'success' });
    }

  )
  connection.end()


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
