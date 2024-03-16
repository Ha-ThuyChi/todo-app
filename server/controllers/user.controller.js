const User = require("../models").user;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        console.log(salt,"and", hash);
        return{hash, salt};
    } catch (error) {
        console.error("Error while hasing password: ", error);
    }
};
exports.createUser = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email,
        }
    }).then((result) => {
        if (result) {
            res.status(409).send({success: false, message: "Email addresd exists."})
        } else {
            const password = req.body.password
            hashPassword(password).then(({hash, salt}) => {
                User.create({
                    name: req.body.name,
                    dob: req.body.dob,
                    email: req.body.email,
                    password: hash,
                    salt: salt,
                }).then(() => {
                    res.status(200).send({success: true, message: "User is created."})
                }).catch(error => {
                    res.status(500).send({success: false, message: error.message})
                }) 
            })
            
        }
    }).catch ((error) => {
        res.status(500).send({success: false, message: error.message})
    });
};

exports.getUserByEmail = (req, res) => {
    const password = req.body.password;
    User.findOne({
        where: {
            email: req.body.email, // check email
        }
    }).then((data) => {
        if (data) {
            bcrypt.compare(password, data.password, function (err, result) {
                if (err) {
                    console.error('Error comparing passwords:', err);
                    return;
                }
                if (result) {
                    const token = jwt.sign({data}, process.env.JWT_SECRET, {expiresIn: '1h'});
                    res.status(200).send({success: true, message: {accessToken: token, data: data.id}});
                } else {
                    res.status(400).send({success: false, message: "Invalid password."});
                }
            });
        } else {
            res.status(400).send({success: false, message: "Invalid email."});
        }
    }).catch(error => {
        res.status(500).send({success: false, message: error.message});
    })
};

exports.getUserById = (req, res) => {
    User.findOne({
        where: {
            id: req.params.userId,
        }
    }).then((data) => {
        res.status(200).send({success: true, message: data})
    }).catch(error => {
        res.status(500).send({success: false, message: error.message});
    })
}