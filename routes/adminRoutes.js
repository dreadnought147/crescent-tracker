// Handles admin dashboard routes and issue status updates

const express = require('express');
const router = express.Router();
const db = require('../db');
const { exportIssuesToCSV } = require('../export');

// Middleware to check if admin is logged in
function isAdminAuthenticated(req, res, next) {
  if (req.session.admin) {
    return next();
  }
  res.redirect('/login');
}

// GET: Render admin dashboard with all issues
router.get('/', isAdminAuthenticated, (req, res) => {
  const { category, urgency, status } = req.query;
  let query = 'SELECT * FROM issues';
  let params = [];
  
  // Apply filters if provided
  if (category || urgency || status) {
    query += ' WHERE';
    let conditions = [];
    if (category) {
      conditions.push('category = ?');
      params.push(category);
    }
    if (urgency) {
      conditions.push('urgency = ?');
      params.push(urgency);
    }
    if (status) {
      conditions.push('status = ?');
      params.push(status);
    }
    query += ' ' + conditions.join(' AND ');
  }

  db.all(query, params, (err, issues) => {
    if (err) {
      console.error('Error fetching issues:', err.message);
      res.status(500).send('DB Server error');
    } else {
      res.render('admin', { title: 'Admin Dashboard', issues });
    }
  });
});

// POST: Update issue status
router.post('/update-status', isAdminAuthenticated, (req, res) => {
  const { id, status } = req.body;
  db.run(
    `UPDATE issues SET status = ? WHERE id = ?`,
    [status, id],
    (err) => {
      if (err) {
        console.error('Error updating status:', err.message);
        res.status(500).send('Server error');
      } else {
        res.redirect('/admin');
      }
    }
  );
});

// GET: Export issues to CSV
router.get('/export', isAdminAuthenticated, (req, res) => {
  exportIssuesToCSV(db, res);
});

module.exports = router;