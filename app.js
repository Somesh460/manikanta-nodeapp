const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

const app = express();
const port = process.env.PORT || 3000;

// Sequelize configuration
const sequelize = new Sequelize('nodeapp', 'admin', 'Password', {
  host: 'nodejs.c0gfpzplj7id.us-east-1.rds.amazonaws.com',
  dialect: 'mysql',
});

// Define the User model
const User = sequelize.define('User', {
  user_id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  user_name: Sequelize.STRING,
  user_email: {
    type: Sequelize.STRING,
    unique: true,
  },
  user_password: Sequelize.STRING,
  user_image: Sequelize.STRING,
  total_orders: Sequelize.INTEGER,
  created_at: Sequelize.DATE,
  last_logged_in: Sequelize.DATE,
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ...

// API endpoints

// Insert a new user
app.post('/insert', (req, res) => {
  const userDetails = req.body;

  User.create(userDetails)
    .then(user => {
      return res.json({ message: 'User inserted successfully' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

// ...

// Start the server
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
