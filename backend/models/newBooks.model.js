const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookName: String,
  author: String,
  genre: String,
});

const NewBooks = mongoose.model("Books", bookSchema);

module.exports = { NewBooks };
