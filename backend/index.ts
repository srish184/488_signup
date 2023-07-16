import express, { Request, Response } from "express";
import cors from "cors";

import mysql from "mysql";

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
// Create a MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "anshu@8095",
  database: "registerUser",
});

connection.connect((error) => {
  if (error) {
    console.error("Error connecting to MySQL:", error);
  } else {
    console.log("Connected to MySQL database.");
  }
});

// Define the API endpoint for user registration
app.post("/register", (req: Request, res: Response) => {
  const { username, password } = req.body;
  const fetch = "SELECT * from users Where username = ?";

  connection.query(fetch, [username], (error: any, resultData: any) => {
    if (resultData.length > 0) {
      res.json({ status: 500, msg: "User is not available" });
    } else {
      const sql = "INSERT INTO users (username, passcode) VALUES (?, ?)";
      connection.query(
        sql,
        [username, password],
        (error: any, results: any) => {
          if (error) {
            console.error("Error registering user:", error);
            if (
              error.sqlMessage ==
                "Check constraint 'users_chk_2' is violated." ||
              error.sqlMessage == "Check constraint 'users_chk_1' is violated."
            ) {
              res.json({
                status: 500,
                msg: "No empty string allowed for username or password field",
                error: error,
              });
            } else {
              res.json({
                status: 500,
                msg: `Failed to register user. ${error.sqlMessage}`,
                error: error,
              });
            }
          } else {
            console.log("User registered successfully:", results);
            res.json({ status: 200, msg: "User registered successfully!!" });
          }
        }
      );
    }
  });
  // Perform user registration logic
});

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
