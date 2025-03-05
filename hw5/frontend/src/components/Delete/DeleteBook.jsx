import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

const DeleteBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Deleting book with ID:", id);
        axios.delete(`http://localhost:3000/api/books/${id}`)
            .then(() => {
                navigate('/');
            })
            .catch(error => {
                console.error("Error deleting book:", error);
            });
    };

    return (
        <div className="container mt-4">
          <h2 className="text-center">Do you want to delete this book?</h2>
          <form onSubmit={handleSubmit} className="w-50 mx-auto">
            <button type="submit" className="btn btn-danger w-100">Confirm</button>
          </form>
          <form onSubmit={() => navigate("/")} className="w-50 mx-auto">
            <button type="submit" className="btn w-100">Cancel</button>
          </form>
        </div>
    );
};

export default DeleteBook;