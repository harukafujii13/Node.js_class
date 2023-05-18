const express = require("express");
const sqlite3 = require("sqlite3");
const morgan = require("morgan");
const path = require("path");
const { query } = require("express");

const app = express();
const PORT = process.env.PORT || 8000;
app.use(morgan("dev"));

const dbPath = path.join(__dirname, "data", "testapp.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error(err.message);

  console.log("Connected to the database");
});

const sqlCreate = `CREATE TABLE IF NOT EXISTS books (
                    Book_ID INTEGER PRIMARY KEY AUTOINCREMENT,
                    Title VARCHAR(255) NOT NULL,
                    Author VARCHAR(100) NOT NULL,
                    Comments TEXT
                    )`;
//create a tanle, insert a record, dropping a table
// db.run(sqlCreate, (err) => {
//   if (err) console.error(err.message);
//   console.log("Create books table");

//   //seeding the table
//   const sqlInsert = `INSERT INTO books (Title) VALUES
//   ('How to Eat','Kui Shin Bo', 'Absolutely Salivating~'),
//   ('Does your cat want to murder you?', 'Dolly M. Scratches, 'Terrifying!')
//   `;

//   db.run(sqlInsert, (err) => {
//     if (err) console.error(err.message);
//     console.log("Created books 2 books");
//   });
// });

app.get("/books", (req, rows) => {
  //create the query
  const sqlSelectAllBooks = "SELECT * FROM Books";
  //query the db.all to execute a query to retrive ALL the rowa
  db.all(sqlSelectAllBooks, (err, rows) => {
    if (err) console.error(err.message);
    // rows.forEach((row) => {
    //   console.log(row.Book_ID + " - " + row.Title);
    // });
  });

  res.json(rows);
});

app.get("/books/:id", (req, res) => {
  const bookId = req.params.id;
  console.log(typeof bookId);
  const sqlSelectBookById =
    "SELECT Title, Author From Books WHERE Book_ID = $id";
  db.get(sqlSelectBookById, { $id: bookId }, (err, row) => {
    if (err) console.error(err.message);
    res.json(row);
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const sqlDeleteBookById = "DELETE FROM Books WHERE Book_ID = $id";
  db.run(sqlDeleteBookById, { $id: bookId }, (err) => {
    if (err) console.error(err.message);
    console.log("Successfully deleted book with ID of " + bookId);
  });
});

app.listen(PORT, () => console.log(`Server is liatening at port: ${PORT}`));

//mome1
//process.env allows you to access and manipulate these variables within your Node.js application.
