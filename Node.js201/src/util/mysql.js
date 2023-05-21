const mysql = require("mysql2");

const pool = mysql.createPool({
  //Database connection
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DBNAME,
  port: process.env.MYSQL_PORT,
  // ssl: {
  //     "rejectUnauthorized": true
  // }
});
//createPool is a method provided by the mysql2 library that creates a connection pool to a MySQL database,
//enabling efficient and reusable connections for performing database operations.

//for railway on how to check if a table exists
const sql = `SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='railway' AND TABLE_NAME='Books'`;
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

//After creating the pool, a query is executed to check if a table named "Books" exists in the specified database.
//The query selects data from the INFORMATION_SCHEMA.TABLES table, filtering based on the database schema name
//and the table name. If the table does not exist, the seedDB function is called to create the table and insert sample data.

const seedDB = () => {
  pool.query(`DROP TABLE IF EXISTS Books`);
  //pool.query is a method provided by the MySQL connection pool object (pool) that allows you to execute SQL queries.

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
        INSERT INTO Books (Book_ID, Title, Author, Comments) VALUES
        (1, 'How To Eat', 'Kui S. Hinbo', 'Absolutely salivating'),
        (2, 'Does Your Cat Want to Murder You?', 'Dolly M. Scratches', 'Unexpectedly chilling')
      `,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Successful creation of 2 books");
    }
  );
};

//The seedDB function performs the following actions:
//It drops the "Books" table if it exists.
//It creates a new "Books" table with the specified columns: Book_ID (auto-incremented primary key), Title (VARCHAR), Author (VARCHAR), and Comments (TEXT).
//It inserts two sample book records into the "Books" table.

module.exports = pool.promise();
//Finally, the connection pool is exported using pool.promise(),
// which wraps the pool with promise-based APIs for easier handling of asynchronous operations.

//function
//this code sets up a MySQL connection pool, checks if a table named "Books" exists in the specified database,
//creates the table and inserts sample data if it doesn't exist,
//and exports the pool for use in other parts of the application.
