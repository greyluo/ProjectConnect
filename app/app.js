import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import multer from 'multer';
const upload = multer();
const app = express();
app.use(bodyParser.json());
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

  app.post('/api/create_project',upload.none(), (req, res) => {
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

    const query = `
      INSERT INTO projects (
        project_name,
        project_description,
        project_type,
        project_status,
        project_start_date,
        project_end_date,
        github_link,
        tasks,
        close_post
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
        req.body.projectName,
        req.body.projectDescription,
        req.body.projectType,
        req.body.projectStatus,
        req.body.projectStartDate,
        req.body.projectEndDate,
        req.body.githubLink,
        JSON.stringify(req.body.tasks),
        req.body.closePost
      ];
      project_db.query(query, values, (err, results) => {
        if (err) {
          res.status(500).send({ error: 'An error occurred while adding the project' });
          throw err;
        }
        res.status(201).send({ message: 'Project added successfully', insertId: results.insertId });
      });
    });

    app.get('/api/projects', (req, res) => {
        const query = 'SELECT * FROM projects';

        db.query(query, (err, results) => {
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

