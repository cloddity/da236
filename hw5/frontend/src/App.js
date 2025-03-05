import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Home from "./components/Home/Home";
import CreateBook from "./components/Create/CreateBook";
import UpdateBook from "./components/Update/UpdateBook";
import DeleteBook from "./components/Delete/DeleteBook";
import axios from 'axios';

const App = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/books")
            .then(response => {
                setBooks(response.data); 
            })
            .catch(error => {
                console.error("Error fetching books:", error);
            });
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home books={books} />} />
                    <Route path="/create" element={<CreateBook />} />
                    <Route path="/update/:id" element={<UpdateBook />} />
                    <Route path="/delete/:id" element={<DeleteBook />} />
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;