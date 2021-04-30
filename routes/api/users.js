const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const User = require('../../models/User');


// POST /api/users/register
// sign up a new user
router.post('/register', (req, res) => {
    const errors = {};
    
    User.findOne({ email: req.body.email })
        .then(user => {
            if(user){
                errors.email = 'Email Already Exists';
                return res.status(400).json(errors);
            }
            else{
                const user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    role: 'driver'
                });
                
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(user.password, salt, (err, hash) => {
                        if(err) throw err;
                        user.password = hash;
                        user.save()
                            .then(user => {
                                res.json({
                                    success: true,
                                    message: "User successfully created"
                                });
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
});


// POST /api/users/adminRegister
// sign up a new admin
router.post('/adminRegister', passport.authenticate('jwt', {session: false}), (req, res) => {
    if(req.user.role === 'admin'){
        const errors = {};
    
        User.findOne({ email: req.body.email })
            .then(user => {
                if(user){
                    errors.email = 'Email Already Exists';
                    return res.status(400).json(errors);
                }
                else{
                    const user = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                        role: 'admin'
                    });
                    
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(user.password, salt, (err, hash) => {
                            if(err) throw err;
                            user.password = hash;
                            user.save()
                            .then(user => {
                                res.json({
                                    success: true,
                                    message: "User successfully created"
                                });
                            })
                            .catch(err => console.log(err));
                        });
                    });
                }
            });
    }
    else {
        return res.status(401).json({
            success: false,
            message: "You are not authorized"
        });
    }
    
});

// POST /api/users/login
// login the user
router.post('/login', (req, res) => {
    const errors = {};
    
    User.findOne({email: req.body.email})
        .then(user => {
            if(!user){
                errors.email = 'User not found';
                return res.status(404).json(errors);
            }
            bcrypt.compare(req.body.password, user.password)
                .then(passwordsMatch => {
                    if(passwordsMatch){
                        const payload = {id: user.id, name: user.name};
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            {expiresIn: 3600},
                            (err, token) => {
                                res.json({
                                    success: true,
                                    name: user.name,
                                    role: user.role,
                                    token: token
                                });
                        });
                    }
                    else{
                        errors.password = 'Incorrect Password';
                        return res.status(400).json(errors);
                    }
                });
        });
});

// GET /api/users/current
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role
    });
});

// GET /api/users/:id
router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            res.json({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            });
        })
        .catch(err => console.log(err));
});

module.exports = router;