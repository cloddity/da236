import {
    GET_BOOKS,
    ADD_BOOK,
    UPDATE_BOOK,
    DELETE_BOOK,
} from "./constants/userConstants";

const initialState = { books: [], loading: false, error: "" };

export const booksReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BOOKS:
            return { loading: false, books: action.payload, error: "" };
        case ADD_BOOK:
            return { ...state, books: [...state.books, action.payload] };
        case UPDATE_BOOK:
            return {
                ...state, books: state.books.map((book) => (book.id === action.payload.id ? action.payload : book)),
            };
        case DELETE_BOOK:
            return { ...state, books: state.books.filter((book) => book.id !== action.payload) };
        default:
            return state;
    }
};

export default booksReducer;