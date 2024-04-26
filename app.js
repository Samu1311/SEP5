const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = 3000;

const pool = new Pool({
  connectionString: "postgres://whsluvzk:RjbwlTSSpePE0xNaA5IJGAX05gSL5IyT@cornelius.db.elephantsql.com/whsluvzk"
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

pool.connect();

app.post('/SignUp', async (req, res) => {
  // Extract user data from the request body
  const { username, password, firstName, lastName, email, phoneNumber, country, dob, gender, numberOfPeople } = req.body;

  try {
    // Set the search path to "EcoHeroDB"
    await pool.query('SET search_path = "EcoHeroDB"');

    // Use the PostgreSQL pool to insert a new user into the database
    const result = await pool.query('INSERT INTO eco_user (username, password, first_name, last_name, email, phone_number, nationality, date_of_birth, gender, household_size) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [username, password, firstName, lastName, email, phoneNumber, country, dob, gender, numberOfPeople]);

    // Send a response indicating success
    res.status(201).json({ message: 'User created successfully', user: result.rows[0] });
  } catch (error) {
    // Handle any errors that occur during the database operation
    console.error(error.message);
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Handle login requests
app.post('/login', async (req, res) => {
  // Extract username and password from the request body
  const { username, password } = req.body;

  try {
    // Set the search path to "EcoHeroDB"
    await pool.query('SET search_path = "EcoHeroDB"');

    // Use the PostgreSQL pool to find the user in the database
    const result = await pool.query('SELECT * FROM eco_user WHERE username = $1 AND password = $2',
      [username, password]);

    // Check if a user with the provided credentials exists
    if (result.rows.length === 1) {
      // Send a response with the username
      res.json({ message: 'Login successful', username: result.rows[0].username });
    } else {
      // No user found with the provided credentials
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    // Handle any errors that occur during the database operation
    console.error(error.message);
    res.status(500).json({ error: 'Error during login' });
  }
});

// Handle request to get experience and progress for a user
app.get('/api/user/:username/progress', async (req, res) => {
  const { username } = req.params;

  try {
      // Set the search path to "EcoHeroDB"
      await pool.query('SET search_path = "EcoHeroDB"');

      // Use the PostgreSQL pool to find the user's progress in the database
      const result = await pool.query('SELECT * FROM progress WHERE username = $1', [username]);

      // Check if a progress record for the user is found
      if (result.rows.length === 1) {
          // Extract relevant fields for the response
          const { recycling_exp, pollution_exp, food_exp, activeacting_exp, sporty_exp } = result.rows[0];

          // Calculate total experience
          const totalExp = recycling_exp + pollution_exp + food_exp + activeacting_exp + sporty_exp;

          // Respond with the progress data and total experience
          res.json({
              recycling_exp,
              pollution_exp,
              food_exp,
              activeacting_exp,
              sporty_exp,
              totalExp,
          });
      } else {
          // No progress found for the user
          res.status(404).json({ error: 'User progress not found' });
      }
  } catch (error) {
      // Handle any errors that occur during the database operation
      console.error(error.message);
      res.status(500).json({ error: 'Error fetching user progress' });
  }
});

// Handle request to get pollution badges for a user
app.get('/api/user/:username/pollution-badges', async (req, res) => {
  const { username } = req.params;

  try {
      // Set the search path to "EcoHeroDB"
      await pool.query('SET search_path = "EcoHeroDB"');

      // Use the PostgreSQL pool to find the user's pollution badges in the database
      const result = await pool.query('SELECT * FROM pollution_badges WHERE progress_id IN (SELECT progress_id FROM progress WHERE username = $1)', [username]);

      // Check if pollution badges are found for the user
      if (result.rows.length > 0) {
          // Extract badge counters for each badge
          const badge1Counter = result.rows.find(badge => badge.badge_number === 1)?.badge_counter || 0;

          // Respond with the badge counters
          res.json({
              badge1Counter,
              // Repeat similar entries for other badges (if needed)
          });
      } else {
          // No pollution badges found for the user
          res.status(404).json({ error: 'Pollution badges not found for the user' });
      }
  } catch (error) {
      // Handle any errors that occur during the database operation
      console.error(error.message);
      res.status(500).json({ error: 'Error fetching pollution badges' });
  }
});

// Handle request to update pollution badge counter for a user
app.post('/api/user/:username/pollution-badges/update', async (req, res) => {
  const { username } = req.params;
  const { badgeNumber, value } = req.body;

  try {
      // Set the search path to "EcoHeroDB"
      await pool.query('SET search_path = "EcoHeroDB"');

      // Use the PostgreSQL pool to update the badge counter in the database
      const result = await pool.query(`
          UPDATE pollution_badges
          SET badge_counter = badge_counter + $1
          WHERE progress_id IN (SELECT progress_id FROM progress WHERE username = $2)
          AND badge_number = $3
          RETURNING badge_counter;
      `, [value, username, badgeNumber]);

      // Check if the badge counter is updated
      if (result.rows.length === 1) {
          // Respond with the updated badge counter
          res.json({
              updatedCounter: result.rows[0].badge_counter,
          });
      } else {
          // Badge update failed
          res.status(404).json({ error: 'Badge update failed' });
      }
  } catch (error) {
      // Handle any errors that occur during the database operation
      console.error(error.message);
      res.status(500).json({ error: 'Error updating pollution badge' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}. Paste this link on your browser window: http://localhost:3000/html/home.html`);
});
