const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();

const { intializeDatabase } = require("./db/db.connection");
const { NewBooks } = require("./models/newBooks.model");

app.use(cors());
app.use(express.json());

intializeDatabase();

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.get("/books", async (req, res) => {
  try {
    const allbooks = await NewBooks.find(); // Fetch all books from the database
    res.json(allbooks);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/books", async (req, res) => {
  try {
    const newBook = new NewBooks(req.body); // Create a new instance of the NewBooks model
    const savedBook = await newBook.save(); // Save the new book to the database
    res.status(201).json({
      message: "Book created successfully",
      book: savedBook,
    }); // Return a success message along with the saved book
  } catch (error) {
    res.status(500).json({
      message: "Failed to create book",
      error,
    });
  }
});

app.delete("/books/:id", async (req, res) => {
  const bookId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json({ error: "Invalid book ID" });
  }

  try {
    const deletedBook = await NewBooks.findByIdAndDelete(bookId); // Updated method

    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json({
      message: "Book deleted successfully",
      book: deletedBook,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/books/:id", async (req, res) => {
  const bookId = req.params.id;
  const updatedBookData = req.body;
  try {
    const updatedBook = await NewBooks.findByIdAndUpdate(
      bookId,
      updatedBookData,
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json({
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
