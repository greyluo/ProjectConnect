import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import multer from 'multer';
import fs from 'fs';
import dotenv from 'dotenv'
dotenv.config()
import { Configuration, OpenAIApi} from 'openai';
const upload = multer();
const app = express();
import jsonData from './tech-stack.json' assert {type: 'json'};

app.use(bodyParser.json());
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
const openai = new OpenAIApi(configuration);
const inputTags = Object.values(jsonData).flat().map(ele =>ele.name)
const user_db = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password: '',
    database:'users'
})
const project_db = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password: '',
    database:'projects'
})
const PORT = process.env.PORT || 3000;
app.get('/api/get_users', (req, res) => {
    user_db.query('SELECT * FROM users', (err, results) => {
      if (err) {
        res.status(500).send({ error: 'An error occurred while fetching users' });
        throw err;
      }
      res.send(results);
    });
  });

  app.post('/api/create_user',upload.none(), (req, res) => {
    const { username, email, name } = req.body;

    if (!username || !email) {
      return res.status(400).send({ error: 'Username and email are required' });
    }

    const query = 'INSERT INTO users (username, email, name) VALUES (?, ?, ?)';
    const values = [req.body.username, req.body.email, req.body.name];

    user_db.query(query, values, (err, results) => {
      if (err) {
        res.status(500).send({ error: 'An error occurred while adding the user' });
        throw err;
      }
      res.status(201).send({ message: 'User added successfully', insertId: results.insertId });
    });
  });

  app.post('/api/create_project',upload.none(), async (req, res) => {
    const {
      projectName,
      projectDescription,
      projectType,
      projectStatus,
      projectStartDate,
      projectEndDate,
      githubLink,
      tasks,
      closePost
    } = req.body;

    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Among all the tags of ${inputTags} generate the most related tags for this software project:${req.body.projectDescription} with no format separated by space ex: a b c`,


    });
    const relatedTags = await completion.data.choices[0].text;
    const query = `
      INSERT INTO projects (
        project_name,
        project_description,
        project_type,
        project_start_date,
        project_end_date,
        github_link,
        tasks,
        close_post,
        project_status,
        tags
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values =  [
        req.body.projectName,
        req.body.projectDescription,
        req.body.projectType,
        req.body.projectStartDate,
        req.body.projectEndDate,
        req.body.githubLink,
        JSON.stringify(req.body.tasks),
        req.body.closePost,
        req.body.projectStatus,
        await relatedTags
      ];
      project_db.query(query,  values,  async (err, results) =>  {
        if (err) {
          res.status(500).send({ error: 'An error occurred while adding the project' });
          throw err;
        }
        res.status(201).send({ message: 'Project added successfully', insertId: results.insertId });
      });
    });

    app.get('/api/get_projects', (req, res) => {
        const query = 'SELECT * FROM projects';

        project_db.query(query, (err, results) => {
          if (err) {
            console.error(err);
            res.status(500).send('Error fetching projects');
          } else {
            res.send(results);
          }
        });
      });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

