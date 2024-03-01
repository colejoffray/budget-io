const passport = require('passport')
const validator = require('validator')
const User = require('../models/User')

module.exports = {
    signUp : async(req, res, next) => {

            console.log(req.body)

            const validationErrors = [];
            if (!validator.isEmail(req.body.email))
              validationErrors.push({ msg: "Please enter a valid email address." });
            if (!validator.isLength(req.body.password, { min: 8 }))
              validationErrors.push({
                msg: "Password must be at least 8 characters long",
              });
            if (req.body.password !== req.body.confirmPassword)
              validationErrors.push({ msg: "Passwords do not match" });
          
            if (validationErrors.length) {
              console.log(validationErrors)
              req.flash("errors", validationErrors);
              res.json({ message: "An error occurred during validation, there are flash messages."});
            }

            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
              });

              try {
                const existingUser = await User.findOne({ email: req.body.email });
              
                if (existingUser) {
                  req.flash('errors', { msg: 'Account with that email address or username already exists.' });
                  res.json( {message: 'Account with that email address or username already exists.' });
                }
              } catch (err) {
                next(err);
              }

             await user.save()

             req.logIn(user, (err) => {
                if (err) {
                  return next(err);
                }
                res.cookie('connect.sid', req.sessionID, { httpOnly: true })
                res.json({ message: 'account created', user: { email: user.email}, sessionId: req.sessionID});
              })

        },
  login: async(req, res, next) => {
    console.log(req.body)
    // Using middleware to authenticate with the 'local' strategy
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err); // Pass any errors to the next middleware
      }
  
      // If no user is found or if authentication fails
      if (!user) {
        req.flash('error', { msg: 'Invalid username or password.' });
        return res.json({message: 'Invalid email or password'})
      }
  
      // If authentication is successful, log in the user
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        // Redirect to the user's profile page
        res.json({messasge: 'Login successful'})
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