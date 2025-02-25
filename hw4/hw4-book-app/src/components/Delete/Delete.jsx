import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const DeleteBook = ({ deleteBook }) => {
  const location = useLocation();
  const id = location.state?.id || "";
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    deleteBook(Number(id));
    navigate("/");
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Do you want to delete this book?</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <button type="submit" className="btn btn-danger w-100">Confirm</button>
      </form>
      <form onSubmit={handleCancel} className="w-50 mx-auto">
        <button type="submit" className="btn w-100">Cancel</button>
      </form>
    </div>
  );
};

export default DeleteBook;
