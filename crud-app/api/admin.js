const express = require('express');
const db = require('../db/connection');
const loginusers = db.get('loginusers');
const router = express.Router();

/* Signin */
router.post('/signin', async (req, res, next) => {
  try {
    const { name, password } = req.body;
    console.log(name, password);
    const user = await loginusers.findOne({name, password});
    if(!user){
      const error = new Error('User does not exist');
      return next(error);
    }
    
    res.status(201).json({
      _id: user._id,
      message: 'Logged in successfully'
    });
  } catch (error) {
    next(error);
  }
});

/* Create a new user */
router.post('/signup', async (req, res, next) => {
  try {
    const { name, password } = req.body;
    console.log(name, password);
    const user = await loginusers.findOne({name});
    
    // user already exists
    if (user) {
      const error = new Error('User already exists');
      res.status(409); // conflict error
      return next(error);
    }
    
    const login = await loginusers.insert({name, password});
    res.status(201).json({
      message: 'user has been created',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;