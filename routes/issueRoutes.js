// Handles routes for issue submission and confirmation pages

const express = require('express');
const router = express.Router();
const db = require('../db');

// Middleware to check if student is logged in
function isStudentAuthenticated(req, res, next) {
  if (req.session.student) {
    return next();
  }
  res.redirect('/login');
}

// GET: Render issue submission form
// GET: Render issue submission form with student's issues
router.get('/', isStudentAuthenticated, (req, res) => {
  const { room_number } = req.session.student;
  db.all(
    `SELECT * FROM issues WHERE room_number = ? ORDER BY timestamp DESC`,
    [room_number],
    (err, issues) => {
      if (err) {
        console.error('Error fetching issues:', err.message);
        res.status(500).send('Server error');
      } else {
        res.render('index', { 
          title: 'Smart Issue Flow Tracker', 
          user: req.session.student,
          issues 
        });
      }
    }
  );
});

// POST: Handle issue submission and save to database
router.post('/submit', isStudentAuthenticated, (req, res) => {
  const { room_number, name, category, urgency, description } = req.body;
  
  // Basic keyword-based categorization (optional bonus)
  let finalCategory = category;
  if (category === 'Other') {
    const descLower = description.toLowerCase();
    if (descLower.includes('leak') || descLower.includes('pipe')) finalCategory = 'Maintenance';
    else if (descLower.includes('noise') || descLower.includes('loud')) finalCategory = 'Noise';
    else if (descLower.includes('clean') || descLower.includes('mess')) finalCategory = 'Cleanliness';
    else if (descLower.includes('admin') || descLower.includes('paperwork')) finalCategory = 'Admin';
  }

  db.run(
    `INSERT INTO issues (room_number, name, category, urgency, description) VALUES (?, ?, ?, ?, ?)`,
    [room_number, name, finalCategory, urgency, description],
    (err) => {
      if (err) {
        console.error('Error inserting issue:', err.message);
        res.status(500).send('Server error');
      } else {
        res.redirect('/confirmation');
      }
    }
  );
});

// GET: Render confirmation page
router.get('/confirmation', isStudentAuthenticated, (req, res) => {
  res.render('confirmation', { title: 'Issue Submitted' });
});

module.exports = router;