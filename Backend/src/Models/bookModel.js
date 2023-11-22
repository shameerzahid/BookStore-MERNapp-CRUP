const mongoose = require("mongoose");

const bookModel = mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publishedYear:{type: Number, required: true}
  },
  { timestaps: true }
);


const Book = mongoose.model("Book", bookModel );

module.exports = Book;