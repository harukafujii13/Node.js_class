const router = require("express").Router();

const {
  getAllBooks,
  getCreateBook,
  postCreateBook,
  getEditBookById,
  postEditBookById,
  deleteBook,
} = require("../controller/books.controller");

//The require statement imports the controller functions getAllBooks,
//getCreateBook, postCreateBook, getEditBookById, postEditBookById,
//and deleteBook from "../controller/books.controller".

router.get("/all", getAllBooks);
router.route("/create").get(getCreateBook).post(postCreateBook);
router.route("/edit/:id").get(getEditBookById).post(postEditBookById);
router.delete("/delete/:id", deleteBook);

module.exports = router;
