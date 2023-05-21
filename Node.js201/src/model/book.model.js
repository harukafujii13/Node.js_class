// const db = require("../util/sqlite");
const db = require("../util/mysql");

module.exports = class Book {
  constructor(Title, Author, Comments) {
    this.Title = Title;
    this.Author = Author;
    this.Comments = Comments;
  }

  save() {
    const sql = "INSERT INTO Books (Title, Author, Comments) VALUES (?, ?, ?)";
    const params = [this.Title, this.Author, this.Comments];
    return db.execute(sql, params);
  }

  //save(): This method inserts a new book record into the database table Books.
  //It uses a prepared SQL statement with placeholders (?)
  //and an array of parameter values ([this.Title, this.Author, this.Comments]).
  //It calls the execute method of the db object (presumably a MySQL database connection) and returns the result.

  static find() {
    const sql = "SELECT * FROM Books ORDER BY Book_ID DESC";
    return db.query(sql);
  }

  //static find(): This static method retrieves all books from the Books table in the database.
  //It executes a SQL query that selects all columns from the table and orders the results
  //by the Book_ID column in descending order. It calls the query method of the db object and returns the result.

  static findById(id) {
    const sql = "SELECT * FROM Books WHERE Book_ID = ?";
    return db.execute(sql, [id]);
  }

  //static findById(id): This static method retrieves a specific book from the Books table based on its Book_ID.
  //It executes a SQL query with a WHERE clause that matches the Book_ID with the provided id parameter.
  //It calls the execute method of the db object and returns the result.

  static updateOne(data) {
    const sql =
      "UPDATE Books SET Title = ?, Author = ?, Comments = ? WHERE (Book_ID = ?)";
    const params = [data.Title, data.Author, data.Comments, data.id];
    return db.execute(sql, params);
  }

  //static updateOne(data): This static method updates a book record in the Books table.
  //It executes an SQL update statement
  //that sets the Title, Author, and Comments columns based on the provided data object,
  //which should include Title, Author, Comments, and id properties. It calls the execute method of the db object and returns the result.

  static deleteOne(id) {
    const sql = "DELETE FROM Books WHERE Book_ID = ?";
    return db.execute(sql, [id]);
  }
  //static deleteOne(id): This static method deletes a book record from the Books table based on its Book_ID.
  //It executes an SQL delete statement with a WHERE clause that matches the Book_ID with the provided id parameter.
  //It calls the execute method of the db object and returns the result.
};
