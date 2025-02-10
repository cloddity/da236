//import express module 
const express = require('express');
//create an express app
const  app = express();
//require express middleware body-parser
const bodyParser = require('body-parser');

//set the view engine to ejs
app.set('view engine', 'ejs');
//set the directory of views
app.set('views', './views');
//specify the path of static directory
app.use(express.static(__dirname + '/public'));

//use body parser to parse JSON and urlencoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var books = [
    { "BookID": "1", "Title": "Book 1", "Author": "Author 1" },
    { "BookID": "2", "Title": "Book 2", "Author": "Author 2" },
    { "BookID": "3", "Title": "Book 3", "Author": "Author 3" }
]
//counter for total unique number of books across lifetime of site
var count = books.length;

//route to root
app.get('/', function (req, res) {
        res.render('home', {
            books: books
        });
});

//route to create book
app.get('/add-book', function (req, res) {
    res.render('add-book');
});

// add code to render the create view
app.post('/create', (req, res) => {
    const { title } = req.body;
    const { author } = req.body;
    if (!title.trim() || !author.trim()) {
        return res.status(400).send('Book info is required');
    }

    // increment book ID count via prefix notation to ensure uniqueness
    const newBook = { BookID: (++count).toString(), Title: title, Author: author };
    books.push(newBook);
    res.redirect('/');  // redirect to home page to show updated list
});

// route to update book
app.get('/update-book', function (req, res) {
    res.render('update-book');
});

// update user
app.post('/update', (req, res) => {
    const { id, title, author } = req.body;
    
    console.log(`Received ID: ${id}, Name: ${title}, Author: ${author}`);
    
    // find book by matching ID
    const book = books.find(book => book.BookID === id);
    
    if (!book) {
        console.log("Book not found!");
        return res.status(404).send('Book not found');
    }

    // update book info
    book.Title = title;
    book.Author = author;
    console.log(`Book updated: ${JSON.stringify(book)}`);

    res.redirect('/');  // redirect to home page with updated users list
});

// route to delete book
app.get('/delete-book', function (req, res) {
    res.render('delete-book');
});

// delete book
app.post('/delete', (req, res) => {
    const { id } = req.body;
    
    console.log(`Received ID for deletion: ${id}`);

    // find the index of the book
    const bookIndex = books.find(book => book.BookID === id);

    if (bookIndex === -1) {
        console.log("Book not found!");
        return res.status(404).send('Book not found');
    }

    // remove the book from the array by ID
    books = books.filter(book => book.BookID !== id);
    
    console.log(`Book with ID ${id} deleted successfully.`);
    
    res.redirect('/'); // redirect to home page with updated users list
});

app.listen(5000, function () {
    console.log("Server listening on port 5000");
});