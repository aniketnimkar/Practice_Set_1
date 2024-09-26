import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBook, fetchBooks } from "../features/BooksSlice";
import BookForm from "./BookForm";
import { useNavigate } from "react-router-dom";

const BooksList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { books, status, error } = useSelector((state) => state.books);

  const [editingBook, setEditingBook] = useState(null); // State to track the book being edited

  const handleDelete = (bookId) => {
    dispatch(deleteBook(bookId));
  };

  const handleEdit = (book) => {
    navigate("/edit-book", { state: { book } });
    // setEditingBook(book); // Set the book to edit
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBooks());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Book List</h1>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            {book.bookName} - {book.author} - {book.genre}
            <button onClick={() => handleDelete(book._id)}>Delete</button>
            <button onClick={() => handleEdit(book)}>Edit</button>
          </li>
        ))}
      </ul>

      {editingBook ? (
        <div>
          <BookForm book={editingBook} />
          <button onClick={() => setEditingBook(null)}>Cancel</button>{" "}
          {/* Add cancel button */}
        </div>
      ) : (
        <BookForm />
      )}
    </div>
  );
};

export default BooksList;
