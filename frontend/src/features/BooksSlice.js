import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await fetch("http://localhost:3000/books");
  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }
  const data = await response.json();
  return data;
});

export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (bookId) => {
    const response = await fetch(`http://localhost:3000/books/${bookId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Faild to delete book");
    }
    return bookId;
  }
);

export const addBookAsync = createAsyncThunk(
  "books/addBook",
  async (newBook) => {
    const response = await fetch("http://localhost:3000/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });
    if (!response.ok) {
      throw new Error("Failed to add book");
    }
    const data = await response.json();
    return data.book;
  }
);

export const updateBookAsync = createAsyncThunk(
  "books/updateBook",
  async (updatedBook) => {
    const response = await fetch(
      `http://localhost:3000/books/${updatedBook._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBook),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update book");
    }
    const data = await response.json();
    return data.book;
  }
);

const initialState = {
  books: [],
  status: "idle",
  error: null,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder.addCase(deleteBook.fulfilled, (state, action) => {
      state.books = state.books.filter((book) => book._id !== action.payload);
    });
    // Handling add book
    builder.addCase(addBookAsync.fulfilled, (state, action) => {
      state.books.push(action.payload);
    });
    // Handling update book
    builder.addCase(updateBookAsync.fulfilled, (state, action) => {
      const index = state.books.findIndex(
        (book) => book._id === action.payload._id
      );
      console.log("index", index);
      if (index !== -1) {
        state.books[index] = action.payload;
      }
    });
  },
});

export default booksSlice.reducer; // Export the reducer as default
