const express = require('express');
const router = express.Router();
authController = require('../controllers/auth');

router.get ("/",(req,res) => {
    res.render("index",{
       
    });
    
    });
router.get ("/register",(req,res) => {
    res.render("register");
        
    });
router.get ("/login",(req,res) => {
    res.render("login");
            
    });

router.get ("/profile",(req,res) => {
    const user = {
        id: req.query.id,
        name: req.query.name,
        email: req.query.email
    };
    res.render('profile',{user});
                
    });

module.exports = router;