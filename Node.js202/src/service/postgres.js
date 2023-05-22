const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

const sql = `SELECT to_regclass('Books')`;
pool.query(sql, (err, data) => {
  if (err) {
    console.log(err);
  }

  if (data.length === 0) {
    console.log(`Table 'Books' does not exist`);
    seedDB();
  } else {
    console.log(`Table 'Books' exists`);
  }
});

const seedDB = async () => {
  await pool.query(`DROP TABLE IF EXISTS Books`);

  await pool.query(
    `CREATE TABLE Books (
          Book_ID SERIAL PRIMARY KEY,
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

  await pool.query(
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

module.exports = pool;

//this code establishes a connection to a PostgreSQL database using pg library's Pool class.
//It checks if a specific table exists, creates the table if it doesn't exist,
//and populates it with initial data. The pool object is then exported for further database operations in other modules.
