const router = require("express").Router();

const {
  getAllBooks,
  getCreateBook,
  postCreateBook,
  getEditBookById,
  postEditBookById,
  deleteBook
} = require("../controller/books.controller");

router.get("/all", getAllBooks);
router.route("/create").get(getCreateBook).post(postCreateBook)
router.route("/edit/:id").get(getEditBookById).post(postEditBookById)
router.delete("/delete/:id", deleteBook)

module.exports = router;
