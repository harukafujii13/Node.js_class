const express = require('express')
const bodyParser = require('body-parser')
const sqlite3 = require('sqlite3')
const morgan = require('morgan')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 8000
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))

const dbPath = path.join(__dirname, "data", "testapp.db")
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error(err.message)

    console.log("Connected to the database")
})

const seedDB = () => {
    db.serialize(() => {

        db.run("DROP TABLE IF EXISTS Books")
        db.run(
            "CREATE TABLE Books (Book_ID INTEGER PRIMARY KEY AUTOINCREMENT, Title VARCHAR(255) NOT NULL, Author VARCHAR(100) NOT NULL,Comments TEXT)",
            (err) => {
                if (err) console.error(err.message)
                console.log("Created books table")
            }
        )
        //seed the db
        db.run(
            "INSERT INTO books (Title,Author,Comments) VALUES ('How to Eat','Kui Shin Bo','Absolutely Salivating~'),('Does your cat want to murder you?', 'Dolly M. Scratches','Terrifying!')",
            (err) => {
                if (err) console.error(err.message)
                console.log("Successfully inserted 2 books")
            }
        )

    })
}

db.serialize(() => {
    const sql = "SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'Books';"
    db.get(sql, (err, row) => {
        if(err) console.error(err.message)

        if(row === undefined){
            console.log("Table 'Books' does not exist!")
            seedDB()
        }else{
            console.log("Table 'Books' exists")
        }
    })
})


app.get("/books", (req, res) => {
    //create the query string
    const sqlSelectAllBooks = "SELECT * FROM Books"
    //query the db.all to execute a query to retrieve ALL the rows
    db.all(sqlSelectAllBooks, (err, rows) => {
        if (err) console.error(err.message)

        // rows.forEach(row => {
        //     console.log(row.Book_ID + " - " + row.Title)
        // });

        res.json(rows)
    })
})

app.post("/books/create", (req,res) => {
    const { title, author, comments } = req.body
    // console.log(req.body)

    const sqlInsertBook = "INSERT INTO Books (Title, Author, Comments) VALUES ($title, $author, $comments)"
    db.run(sqlInsertBook, {
        $title: title,
        $author: author,
        $comments: comments
    }, (err) => {
        if(err) console.error(err.message)

        console.log("New book added with id: " + this.lastID)
        return res.redirect("/books")
    })
})

app.get("/books/:id", (req, res) => {
    const bookId = req.params.id
    const sqlSelectBookById = "SELECT Title, Author FROM Books WHERE Book_ID = $id"
    db.get(sqlSelectBookById, { $id: bookId }, (err, row) => {
        if (err) console.error(err.message)
        res.json(row)
    })
})

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id
    const sqlDeleteBookById = "DELETE FROM Books WHERE Book_ID = $id"
    db.run(sqlDeleteBookById, { $id: bookId }, (err) => {
        if (err) console.error(err.message)

        console.log('Successfully deleted book with ID of ' + bookId)
        res.json({ msg: 'Successfully deleted book with ID of ' + bookId })
    })
})

app.listen(PORT, () => console.log(`Server is listening at port: ${PORT}`))