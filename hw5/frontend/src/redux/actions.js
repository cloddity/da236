import axios from "axios";
import {
    GET_BOOKS,
    ADD_BOOK,
    UPDATE_BOOK,
    DELETE_BOOK,
} from "./constants/userConstants";

export const getBooks = () => async (dispatch) => {
    try {
        const response = await axios.get("http://localhost:3000/api/books");
        dispatch({ type: GET_BOOKS, payload: response.data });
    } catch (error) {
        console.error("Error getting books:", error);
    }
};

export const addBook = (title, author) => async (dispatch) => {
    try {
        const response = await axios.post("http://localhost:3000/api/books", { title, author });
        dispatch({ type: ADD_BOOK, payload: response.data });
    } catch (error) {
        console.error("Error adding book:", error);
    }
};

export const updateBook = (id, title, author) => async (dispatch) => {
    try {
        await axios.put(`http://localhost:3000/api/books/${id}`, { title, author });
        dispatch({ type: UPDATE_BOOK, payload: { id, title, author } });
    } catch (error) {
        console.error("Error updating book:", error);
    }
};

export const deleteBook = (id) => async (dispatch) => {
    try {
        await axios.delete(`http://localhost:3000/api/books/${id}`);
        dispatch({ type: DELETE_BOOK, payload: id });
    } catch (error) {
        console.error("Error deleting book:", error);
    }
};