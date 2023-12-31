const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { get } = require("mongoose");

module.exports = {
    register: (req, res) => {
        User.create(req.body)
            .then(user => {
                const userToken = jwt.sign({
                    id: user._id
                }, process.env.JWT_SECRET);

                res
                    .cookie("usertoken", userToken, {
                        httpOnly: true
                    })
                    .json({ msg: "success!", user: user });
            })
            .catch(err => res.json(err));
    },

    login: async (req, res) => {
        try {
            console.log('Received login request with email:', req.body.email);
            const user = await User.findOne({ email: req.body.email });
    
            if (user === null) {
                console.log('User not found.');
                return res.sendStatus(400);
            }
    
            const correctPassword = await bcrypt.compare(req.body.password, user.password);
    
            if (!correctPassword) {
                console.log('Incorrect password.');
                return res.sendStatus(400);
            }
    
            const userToken = jwt.sign({
                id: user._id
            }, process.env.JWT_SECRET);
    
            res
                .cookie("usertoken", userToken, {
                    httpOnly: true
                })
                .json({ msg: "success!" });
        } catch (err) {
            console.error('Error during login:', err);
            res.status(500).json({ error: 'Server error' });
        }
    },

    getLoggedInUser: (req, res) => {
        const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });

        if (!decodedJWT || !decodedJWT.payload) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        User.findById(decodedJWT.payload.id)
            .then(user => res.json(user))
            .catch(err => res.json(err));
    },
    logout: (req, res) => {
        res.clearCookie('usertoken');
        res.sendStatus(200);
    },

    getAll: (req, res) => {
        User.find()
            .then(users => res.json(users))
            .catch(err => res.json(err));
    },

    delete: (req, res) => {
        User.findByIdAndDelete(req.params.id)
            .then(result => res.json(result))
            .catch(err => res.json(err));
    }



};
