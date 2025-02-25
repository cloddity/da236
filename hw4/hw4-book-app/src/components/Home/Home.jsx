import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = ({ books }) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Book list updated:", books);
  }, [books]);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4"><strong>Book Management App</strong></h1>
      <h3 className="text-center">Book List</h3>

      <div className="row">
        {books.map((book) => (
          <div className="row-md-4" key={book.id}>
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <h6 className="card-title">{book.author}</h6>
                <p className="card-text"><strong>ID:</strong> {book.id}</p>

                <div className="row-md-4">
                  <button className="btn btn-warning" onClick={() => navigate("/update", { state: { id: book.id } })}>
                    Update
                  </button>
                  <button className="btn btn-danger" onClick={() => navigate("/delete", { state: { id: book.id } })}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-success btn-lg" onClick={() => navigate("/create")}>
          Create Book
        </button>
      </div>
    </div>
  );
};

export default Home;
