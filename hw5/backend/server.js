const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const books = [
  { id: 1, title: 'Shimeji Simulation', author: 'Tsukumizu' },
];

app.get('/api/books', (req, res) => {
  res.json(books);
});

app.post('/api/books', (req, res) => {
  const newBook = req.body;
  books.push({ id: books.length + 1, ...newBook });
  res.status(201).json(newBook);
});

app.put('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const updatedBook = req.body;
  const index = books.findIndex(book => book.id === parseInt(id));
  if (index !== -1) {
    books[index] = { id: parseInt(id), ...updatedBook };
    res.json(books[index]);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

app.delete('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const index = books.findIndex(book => book.id === parseInt(id));
  if (index !== -1) {
    books.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});