import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

const UpdateBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedBook = { title: title, author: author };
        axios.put(`http://localhost:3000/api/books/${id}`, updatedBook)
            .then(() => {
                navigate('/');
            })
            .catch(error => {
                console.error("Error deleting book:", error);
            });
    };

    return (
        <div className="container mt-4">
          <h2 className="text-center">Update Book</h2>
          <form onSubmit={handleSubmit} className="w-50 mx-auto">
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Enter new title"
                value={title} onChange={(e) => setTitle(e.target.value)} required />
              <input type="text" className="form-control" placeholder="Enter new author"
                value={author} onChange={(e) => setAuthor(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-warning w-100">Update Book</button>
          </form>
          <form onSubmit={() => navigate("/")} className="w-50 mx-auto">
            <button type="submit" className="btn w-100">Cancel</button>
          </form>
        </div>
      );
    };

export default UpdateBook;