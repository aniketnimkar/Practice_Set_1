import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../features/BooksSlice";
// import { fetchBooks } from "../features/BooksSlice";
// import { booksSlice } from "../features/BooksSlice";
export const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});
