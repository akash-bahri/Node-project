const express = require('express');
const userService = require('../services/userService.js');
const router = express.Router();

// Route to display the form for creating a new user
router.get('/new', (req, res) => {
  res.render('newUser');
});

// Route to handle the creation of a new user
router.post('/', async (req, res) => {
  try {
    req.body.active = req.body.active === 'on';
    // console.log("1: "+JSON.stringify(req.body));
    await userService.createUser(req.body);
    res.redirect('/users');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Route to display all users
router.get('/', async (req, res) => {
  try {
    req.session.views++;
    const users = await userService.getAllUsers();
    res.render('index', { users });
  } catch (error) {
    res.status(500).send(error.message);
  }
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

module.exports = router;
