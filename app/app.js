import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';

const app = express();
app.use(bodyParser.json());
const db = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password: '',
    database:'users'
})
const PORT = process.env.PORT || 3000;
app.get('/api/get_users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
      if (err) {
        res.status(500).send({ error: 'An error occurred while fetching users' });
        throw err;
      }
      res.send(results);
    });
  });

  app.post('/api/create_user', (req, res) => {
    const { username, email, name } = req.body;

    if (!username || !email) {
      return res.status(400).send({ error: 'Username and email are required' });
    }

    const query = 'INSERT INTO users (username, email, name) VALUES (?, ?, ?)';
    const values = [username, email, name];

    db.query(query, values, (err, results) => {
      if (err) {
        res.status(500).send({ error: 'An error occurred while adding the user' });
        throw err;
      }
      res.status(201).send({ message: 'User added successfully', insertId: results.insertId });
    });
  });

app.post('/api/create_project'), (req, res) =>{
    const 

}
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

