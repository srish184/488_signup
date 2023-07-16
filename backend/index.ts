import express, { Request, Response } from 'express';
import cors from 'cors';


import mysql from 'mysql';

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'anshu@8095',
  database: 'registerUser',
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL:', error);
  } else {
    console.log('Connected to MySQL database.');
  }
});

// Define the API endpoint for user registration
app.post('/register', (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Perform user registration logic
  const sql = 'INSERT INTO users (username, passcode) VALUES (?, ?)';
  connection.query(sql, [username, password], (error: any, results: any) => {
    if (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Failed to register user.' });
    } else {
      console.log('User registered successfully:', results);
      res.sendStatus(200);
    }
  });
});

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
