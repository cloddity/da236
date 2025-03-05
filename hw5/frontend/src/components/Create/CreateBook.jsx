import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

const CreateBook = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newBook = { title: title, author: author };
        try {
            const response = await axios.post('http://localhost:3000/api/books', newBook);
            navigate('/');
        } catch (error) {
            console.error("Error creating book:", error);
        }
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
      <form onSubmit={() => navigate("/")} className="w-50 mx-auto">
        <button type="submit" className="btn w-100">Cancel</button>
      </form>
    </div>
    );
};

export default CreateBook;