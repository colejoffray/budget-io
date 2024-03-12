const passport = require('passport')
const validator = require('validator')
const User = require('../models/User')

module.exports = {
  signUp: async (req, res, next) => {
    try {
      const validationErrors = [];
      if (!validator.isEmail(req.body.email))
        validationErrors.push({ msg: "Please enter a valid email address." });
      if (!validator.isLength(req.body.password, { min: 8 }))
        validationErrors.push({
          msg: "Password must be at least 8 characters long",
        });
      if (req.body.password !== req.body.confirmPassword)
        validationErrors.push({ msg: "Passwords do not match" });
  
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        validationErrors.push({ msg: 'A user with that email already exists.'})
      }

      if (validationErrors.length) {
        return res.json({ 
          message: "An error occurred during validation, there are flash messages.", 
          validationErrors: validationErrors 
        });
      }
  
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
  
      await user.save();
  
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        res.cookie('connect.sid', req.sessionID, { httpOnly: true });
        console.log('account created')
        res.json({ 
          message: 'account created', 
          user: { email: user.email, id: user.id }, 
        });
      });
    } catch (err) {
      next(err);
    }
  },
  
  login: async(req, res, next) => {
    const validationErrors = []
    // Using middleware to authenticate with the 'local' strategy
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err); // Pass any errors to the next middleware
      }
  
      // If no user is found or if authentication fails
      if (!user) {
        validationErrors.push({ msg: 'Invalid email or password'})
        return res.json({message: 'Invalid email or password', validationErrors: validationErrors})
      }
  
      // If authentication is successful, log in the user
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        // Redirect to the user's profile page
        res.json({message: 'Login successful', user: { email: user.email, id: user.id}})
      });
    })(req, res, next);
  }, 
  logoutUser: async(req,res) => {
    req.logout(function(err){
      if(err) return (next(err))
      res.json({ message: 'logged out user'})
  })
  }
}