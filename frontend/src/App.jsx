import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BooksList from "./componants/BooksList";
import BookForm from "./componants/BookForm";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BooksList />} />
        <Route path="/edit-book" element={<BookForm />} /> {/* Edit route */}
      </Routes>
    </Router>
  );
}

export default App;
