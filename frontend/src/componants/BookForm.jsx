import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addBookAsync, updateBookAsync } from "../features/BooksSlice";
import { useLocation, useNavigate } from "react-router-dom";
const BookForm = () => {
  const location = useLocation(); // Get location to access state
  const book = location.state?.book || null; // Get the book data if editing
  const [bookName, setBookName] = useState(book?.bookName || "");
  const [author, setAuthor] = useState(book?.author || "");
  const [genre, setGenre] = useState(book?.genre || "");
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    // Simple validation
    if (!bookName || !author || !genre) {
      setError("All fields are required.");
      return;
    }
    const newBook = { bookName, author, genre };

    if (book) {
      dispatch(updateBookAsync({ ...newBook, _id: book._id })); // For editing a book
    } else {
      dispatch(addBookAsync(newBook)); // For adding a new book
    }

    // After submit, navigate back to book list
    navigate("/");
    // Clear form fields after submission
    // setBookName("");
    // setAuthor("");
    // setGenre("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Book Name</label>
        <input
          type="text"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
        />
      </div>
      <div>
        <label>Author</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div>
        <label>Genre</label>
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">{book ? "Update Book" : "Add Book"}</button>
    </form>
  );
};

export default BookForm;
