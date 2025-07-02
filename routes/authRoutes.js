const express = require('express');
const router = express.Router();
const db = require('../db');

//Render the login 
router.get('/login', (req,res)=>{
  res.render('login', {title: 'Login', error:null});
})
// Post the Login to eneter a dashboard
router.post('/login', (req,res)=> {
  const { userType, password, student_number, room_number}= req.body;

    if (userType === 'admin') {
    // Hardcoded admin password
    if (password === 'admin123') {
      req.session.admin = true;
      res.redirect('/admin');
    } else {
      res.render('login', { title: 'Login', error: 'Invalid admin password' });
    }
  }else if (userType == 'student'){
    db.get(
      `SELECT * FROM students WHERE student_number = ? AND room_number = ?`,
      [student_number, room_number],
      (err, user)=>{
        if (err) {
        console.error('Error querying user:', err.message);
        res.status(500).send('Server error');  } else if (user){
          req.session.student = {student_number, room_number};
          res.redirect('/')
        }
        else{
          res.render('login',{title: 'Login', error: 'Invalid login credentials'});
        }
      }
    )
  }
  else{
      res.render('login', { title: 'Login', error: 'Invalid user type' });
  }
})

// Get: logout 

router.get('/logout', (req,res)=>{
  req.session.destroy(()=>{
    res.redirect('/login')
  });
})
module.exports = router