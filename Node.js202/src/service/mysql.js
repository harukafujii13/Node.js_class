const mysql = require('mysql2')

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
    // ssl: {
    //     "rejectUnauthorized": true
    // }
})

//for railway on how to check if a table exists
const sql = `SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='railway' AND TABLE_NAME='Books'`
pool.query(sql, (err, data) => {
    if (err) {
      return console.error(err.message);
    }

    if (data.length === 0) {
      console.log("Table 'Books' does not exist");
      seedDB();
    } else {
      console.log("Table 'Books' exists");
    }

  });

  const seedDB = () => {
    pool.query(`DROP TABLE IF EXISTS Books`);

    pool.query(
      `CREATE TABLE Books (
          Book_ID INT PRIMARY KEY AUTO_INCREMENT,
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
    );

    pool.query(
      `
        INSERT INTO Books (Title, Author, Comments) VALUES
        ('How To Eat', 'Kui S. Hinbo', 'Absolutely salivating'),
        ('Does Your Cat Want to Murder You?', 'Dolly M. Scratches', 'Unexpectedly chilling')
      `,
      (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log("Successful creation of 2 books");
      }
    );
  };

module.exports = pool.promise()