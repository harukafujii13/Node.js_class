const { MongoClient, ObjectId } = require("mongodb");

const URL = process.env.MONGO_URL,
  dbName = process.env.MONGO_DB_NAME;

const mongoConnect = async () => {
  const dbo = await MongoClient.connect(URL);

  //check if db exists
  const dbList = await dbo.db().admin().listDatabases();
  const dbExists = dbList.databases.find((db) => db.name === dbName);
  if (!dbExists) {
    //seed the db
    const books = [
      {
        title: "The Accursed God",
        author: "Vivek Dutta Mishra",
        comments: "A great read",
      },
      {
        title: "The Count of Monte Cristo",
        author: "Alexandre Dumas",
        comments: "A classic",
      },
      {
        title: "The Fountainhead",
        author: "Ayn Rand",
        comments: "Ayn Rand's best",
      },
    ];

    await dbo.db(dbName).collection("books").insertMany(books);
  }

  console.log(`Connected to ${dbName}!`);
  return await dbo.db(dbName);
};

module.exports = { mongoConnect, ObjectId };

//memo1
//The mongoConnect function is defined as an asynchronous function. It establishes a connection
//to the MongoDB database using MongoClient.connect and the provided URL.
//The connection object is assigned to the dbo variable.

//memo2
//1. dbo.db() returns a reference to the current database connection.
//2.admin() is a method that returns a reference to the admin database,
//  which is a built-in database in MongoDB that provides administrative functionality.
//3.listDatabases() is a method that retrieves a list of all databases in the MongoDB server.
//  It returns an array of database objects.
//4.The result of listDatabases() is assigned to the dbList variable using await since the method returns a promise.

//memo3
//this module provides a function (mongoConnect) to establish a connection to a MongoDB database
//and returns the connected database object.
//It also provides the ObjectId class for generating unique identifiers.
