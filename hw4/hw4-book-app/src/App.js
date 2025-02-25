import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import CreateBook from "./components/Create/Create";
import UpdateBook from "./components/Update/Update";
import DeleteBook from "./components/Delete/Delete";

const App = () => {
  const [books, setBooks] = useState([
    { id: 1, title: "Shimeji Simulation", author: "Tsukumizu" }
  ]);

  // Function to add a new book
  const addBook = (title, author) => {
    const newBook = { id: books.length + 1, title, author };
    setBooks([...books, newBook]);
  };

  // Function to update book by ID
  const updateBook = (id, newTitle, newAuthor) => {
    setBooks(books.map((book) => (book.id === id ? { ...book, title: newTitle, author: newAuthor } : book)));
  };

  // Function to delete a book by ID
  const deleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home books={books} />} />
        <Route path="/create" element={<CreateBook addBook={addBook} />} />
        <Route path="/update" element={<UpdateBook updateBook={updateBook} />} />
        <Route path="/delete" element={<DeleteBook deleteBook={deleteBook} />} />
      </Routes>
    </Router>
  );
};

export default App;
