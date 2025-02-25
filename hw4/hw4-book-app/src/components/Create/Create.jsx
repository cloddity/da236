import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const CreateBook = ({ addBook }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook(title, author);
    navigate("/");
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Add New Book</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Enter title"
            value={title} onChange={(e) => setTitle(e.target.value)} required />
          <input type="text" className="form-control" placeholder="Enter author"
            value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-success w-100">Add Book</button>
      </form>
      <form onSubmit={handleCancel} className="w-50 mx-auto">
        <button type="submit" className="btn w-100">Cancel</button>
      </form>
    </div>
  );
};

export default CreateBook;
