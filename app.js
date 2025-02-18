// app.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const PORT = 3000;
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60, } // Session automatically expires in 1 minute
}));

app.use(express.json());
app.use((req, res, next) => {
  console.log('Session Data:', req.session);
  next();
});

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
    res.render('index', { user: req.session.user });
});

app.get('/login', (req, res) => {
  const loginFailed = req.session.loginFailed || false;
  req.session.loginFailed = false;
  res.render('login', { loginFailed });
});

app.get('/dashboard', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    
    res.render('dashboard', { user: req.session.user });
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/dashboard');
        }
        res.redirect('/');
    });
});

// app.js
const bcrypt = require('bcryptjs');

bcrypt.setRandomFallback((len) => {
    const buf = new Uint8Array(len);
    return buf.map(() => Math.floor(Math.random() * 256));
  });

// Dummy user data (for demo purposes)
const users = [
  {
      id: 1,
      username: 'admin',
      password: bcrypt.hashSync('password', 8)
  }
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (user && bcrypt.compareSync(password, user.password)) {
      req.session.loginFailed = false;
      req.session.user = user;
      res.redirect('/dashboard');
  } else {
      req.session.loginFailed = true;
      res.redirect('/login');
  }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});