const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/book.routes');
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use('/api', userRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});