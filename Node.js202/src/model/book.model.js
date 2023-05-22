// const db = require("../service/sqlite");
// const db = require("../service/mysql")
// const db = require("../service/postgres")

const { mongoConnect, ObjectId } = require("../service/mongodb");
const db = mongoConnect();

//The code imports mongoConnect and ObjectId from the "../service/mongodb" module.
//mongoConnect is a function used to establish a connection to the MongoDB database,
//and ObjectId is a class provided by the MongoDB driver for generating unique identifiers.

module.exports = class Book {
  constructor(title, author, comments) {
    this.title = title;
    this.author = author;
    this.comments = comments;
  }

  async save() {
    return (await db).collection("books").insertOne(this);
  }

  //The save method is an asynchronous function that inserts the current Book instance into the "books" collection of the database.
  //It uses the insertOne method of the db object (which represents the database connection) and returns a promise.

  static async find() {
    return (await db).collection("books").find().toArray();
  }
  //The find method is a static asynchronous function that retrieves all documents from the "books" collection as an array.
  //It uses the find method of the db object and converts the result to an array using toArray. It also returns a promise.

  static async findById(id) {
    return (await db)
      .collection("books")
      .find({ _id: new ObjectId(id) })
      .toArray();
  }
  //The findById method is a static asynchronous function that retrieves a specific book based on the provided id.
  //It uses the find method of the db object with a filter object that matches the _id field with the provided id (converted to an ObjectId).
  //The result is converted to an array using toArray and returned as a promise.

  static async updateOne(data) {
    return (await db).collection("books").updateOne(
      { _id: new ObjectId(data.id) }, //filter
      {
        $set: {
          title: data.title,
          author: data.author,
          comments: data.comments,
        },
      }
    ); //update

    //The updateOne method is a static asynchronous function that updates a specific book based on the provided data object.
    //It uses the updateOne method of the db object with a filter object that matches the _id field with the data.id (converted to an ObjectId)
    //and an update object that sets the title, author, and comments fields to the values provided in the data object. It returns a promise.
  }

  static async deleteOne(id) {
    return (await db).collection("books").deleteOne({ _id: new ObjectId(id) });
  }
  //The deleteOne method is a static asynchronous function that deletes a specific book based on the provided id.
  //It uses the deleteOne method of the db object with a filter object that matches the _id field
  //with the provided id (converted to an ObjectId). It returns a promise.
};

//Schema ---> Table ----> Row
//Schema/DB ---> Collection ----> Document
