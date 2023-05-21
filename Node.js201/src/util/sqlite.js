const sqlite3 = require("sqlite3").verbose(); //captures stack traces when enqueuing queries. This is useful for debugging
const path = require("path");

const { srcDir } = require("../util/path-helper");

const db_name = path.join(srcDir, "data", "apptest.db");
const db = new sqlite3.Database(
  db_name,
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Successful connection to the database 'apptest.db'");
  }
);

const seedDB = () => {
  db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS Books`)
      .run(
        `CREATE TABLE Books (
        Book_ID INTEGER PRIMARY KEY AUTOINCREMENT,
        Title VARCHAR(100) NOT NULL,
        Author VARCHAR(100) NOT NULL,
        Comments TEXT
        )`,
        (err) => {
          if (err) {
            return console.error(err.message);
          }
          console.log("Successful creation of the 'Books' table");
        }
      )
      .run(
        `
        INSERT INTO Books (Title, Author, Comments) VALUES
        ('How To Eat', 'Kui Shinbo', 'Absolutely salivating'),
        ('Does Your Cat Want to Murder You?', 'Dolly M. Scratches', 'Unexpectedly chilling')
        `,
        (err) => {
          if (err) {
            return console.error(err.message);
          }
          console.log("Successful creation of 2 books");
        }
      );
  });
};

//sqlite_master is an internal table that is present in all SQLite databases
db.serialize(() => {
  const sql = `SELECT name FROM sqlite_master WHERE type='table' AND name='Books'`;
  db.get(sql, [], (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    if (row === undefined) {
      console.log("Table 'Books' does not exist");
      seedDB();
    } else {
      console.log("Table 'Books' exists");
    }
  });
});

module.exports = db;
