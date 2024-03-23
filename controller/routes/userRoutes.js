const express = require('express');
const userService = require('../services/userService.js');
const userDomain = require('../domain/userDomain.js');
const router = express.Router();


// Route to display the form for creating a new user
router.get('/new', (req, res) => {
  res.render('newUser');
});

// Route to handle the creation of a new user
router.post('/new', async (req, res) => {
  try {
    let user = await userService.createUser(req.body);
    req.session.user = user;
    res.redirect('/users');
  } catch (error) {
    res.render('newuser', { error: error.message });
  }
});

// Route to display all users
router.get('/', async (req, res) => {
  try {
    req.session.views++;
    const users = await userService.getAllUsers();
    res.render('user', { users });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
// Route to handle the login form

  router.post('/login', async (req, res) => {
    const user = await userDomain.login(req.body.email, req.body.password);
    
    if (!user) {
      return res.render('login',{error:"Invalid email or password"});
      
    }
    
    req.session.user = user;
    req.session.views = 1;
    res.redirect('/users');
  });   

// Route to display the form for editing a user
router.get('/edit/:id', async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.render('editUser', { user });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to handle the updating of a user
router.post('/:id', async (req, res) => {
  try {
    req.body.active = req.body.active === 'on';
    await userService.updateUser(req.params.id, req.body);
    res.redirect('/users');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Route to handle the deletion of a user
router.get('/delete/:id', async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.redirect('/users');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to display the login form
router.get('/login', (req, res) => {
  res.render('login');
});



// Route to display the signup form
router.get('/signup', (req, res) => {
  res.render('signup');
});

// Route to handle the signup form
router.post('/signup', async (req, res) => {
  try {
    await userService.createUser(req.body);
    res.redirect('/users/login');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Route to handle the logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});


//

module.exports = router;
